import { awscdk } from "projen";
const project = new awscdk.AwsCdkTypeScriptApp({
  name: "p6-domain-records",

  authorEmail: "pgollucci@p6m7g8.com",
  authorName: "Philip M. Gollucci",
  authorUrl: "https://www.linkedin.com/in/pgollucci",
  authorOrganization: true,

  repository: "https://github.com/p6m7g8/p6-domains-records",
  stability: "experimental",

  description: "P6: Creates domain records from a yaml files in Route53",
  keywords: ["aws", "cdk", "dns", "domains", "route53", "p6"],

  cdkVersion: "2.81.0",
  defaultReleaseBranch: "main",
  projenrcTs: true,
  releaseFailureIssue: true,
  prettier: true,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ["p6m7g8-automation"],
  },

  deps: ["fs@^0.0.2", "@types/js-yaml", "js-yaml"],
});
project.synth();
