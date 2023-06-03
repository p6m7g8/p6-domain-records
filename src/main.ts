import * as cdk from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";
import { MxRecordValue } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import * as fs from "fs";
import * as yaml from "js-yaml";

const CONF_DIR = "conf";

interface Record {
  name: string;
  type: string;
  values: string[];
}

interface Domain {
  name: string;
  records: Record[];
}

interface DomainStackProps extends cdk.StackProps {
  domain: Domain;
}

export class MyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: DomainStackProps) {
    super(scope, id, props);

    const domain = props.domain;

    const zone = route53.PublicHostedZone.fromLookup(
      this,
      `${domain.name}-records`,
      {
        domainName: domain.name,
      }
    );

    domain.records.forEach((record: Record) => {
      switch (record.type) {
        case route53.RecordType.A:
          return this.createARecord(zone, record);
        case route53.RecordType.AAAA:
          return this.createAaaaRecord(zone, record);
        case route53.RecordType.CNAME:
          return this.createCnameRecord(zone, record);
        case route53.RecordType.MX:
          return this.createMxRecord(zone, record);
        case route53.RecordType.TXT:
          return this.createTxtRecord(zone, record);
      }
    });
  }

  private createARecord(zone: route53.IPublicHostedZone, record: Record) {
    new route53.ARecord(this, `Record-${record.type}-${record.type}-${record.name}`, {
      zone,
      recordName: record.name,
      target: route53.RecordTarget.fromIpAddresses(record.values[0]),
    });
  }

  private createAaaaRecord(zone: route53.IPublicHostedZone, record: Record) {
    new route53.AaaaRecord(this, `Record-${record.type}-${record.name}`, {
      zone,
      recordName: record.name,
      target: route53.RecordTarget.fromIpAddresses(record.values[0]),
    });
  }

  private createCnameRecord(zone: route53.IPublicHostedZone, record: Record) {
    new route53.CnameRecord(this, `Record-${record.type}-${record.name}`, {
      zone,
      recordName: record.name,
      domainName: record.values[0],
    });
  }

  private createMxRecord(zone: route53.IPublicHostedZone, record: Record) {
    const values: MxRecordValue[] = record.values.map((value: string) => {
      const [priorityStr, hostName] = value.split(" ");
      const priority = parseInt(priorityStr);
      return { priority, hostName };
    });

    new route53.MxRecord(this, `Record-${record.type}-${record.name}`, {
      zone,
      recordName: record.name,
      values,
    });
  }

  private createTxtRecord(zone: route53.IPublicHostedZone, record: Record) {
    new route53.TxtRecord(this, `Record-${record.type}-${record.name}`, {
      zone,
      recordName: record.name,
      values: record.values,
    });
  }
}

function parseYamlFile(filePath: string): Domain {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const yamlData = yaml.load(fileContents) as Domain;
  return yamlData;
}

const theEnv = {
  account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

fs.readdirSync(CONF_DIR).forEach((file: string) => {
  if (file.endsWith(".yml") || file.endsWith(".yaml")) {
    const domain = parseYamlFile(`${CONF_DIR}/${file}`);
    console.log(`Creating stack for ${domain.name}`);
    const stackName = "p6-domains-" + domain.name.replace(/\./g, "-");

    new MyStack(app, stackName, { domain: domain, env: theEnv });
  }
});

app.synth();
