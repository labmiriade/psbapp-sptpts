#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack, InfrastructureStackProps } from '../lib/infrastructure-stack';

const DATA_URLS = [
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/comune_di_schio_impianti_sportivi.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/comune_di_thiene_impianti_sportivi.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/dataset_impianti_sportivi.csv', //valdagno
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/comune_di_malo_impianti_sportivi.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/comune_di_monte_di_malo_impianti_sportivi.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/comune_di_santorso_impianti_sportivi.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/impianti_sportivi.csv', //s.vito di leguzzano
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/impianti_sportivi_comune_di_torrebelvicno_2021.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/comune_di_villaverla_impianti_sportivi.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/comune_di_zugliano_impianti_sportivi.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/comune_di_isola_vicentina_impianti_sportivi.csv',
];

const env: cdk.Environment = {
  account: '<ACCOUNT_ID>',
  region: '<AWS_REGION>',
};

const app = new cdk.App();
cdk.Tags.of(app).add('project', 'PSBAPP');

/////// STACK DI SVILUPPO

// default props for all dev env: customizable afterwards
function makeDefaultDevProps(ownerName: string, ownerEmail: string): InfrastructureStackProps {
  return {
    env,
    endUserWebApp: {
      domain: `sptpts-${ownerName.toLowerCase()}.example.org`,
      buildCommand: 'testBuild',
      shouldCacheS3: false,
      zoneName: undefined, // route53 is not in the same account
      certificateArn: '<CERTIFICATE_ARN>',
      apiBaseUrl: `/api`,
    },
    description: `Development Stack for Pasubio App - SptPts owned by ${ownerName}`,
    destroyOnRemoval: true,
    csvDataUrls: JSON.stringify(DATA_URLS),
    locationMapArn: '<LOCATION_MAP_ARN>',
    searchProps: {
      indexPrefix: ownerName,
      reuseDomainAttributes: {
        domainArn: '<ES_DOMAIN_ARN>',
        domainEndpoint: '<ES_ENDPOINT>',
      },
    },
    alarmEmail: ownerEmail,
  };
}

// an object with all dev props
const devProps: { [ownerEmail: string]: InfrastructureStackProps } = {
  'user@example.org': makeDefaultDevProps('user'),
};

// creates a stack for each dev
for (const ownerEmail of Object.keys(devProps)) {
  const ownerName = ownerEmail.split('@')[0].replace('.', ''); // from n.cognome@mail.com to ncognome
  const stackName = `PSBAPPSptPtsDev${ownerName}`;
  const props = devProps[ownerEmail];
  const stack = new InfrastructureStack(app, stackName, props);
  cdk.Tags.of(stack).add('referente', ownerEmail);
  cdk.Tags.of(stack).add('owner', ownerEmail);
  cdk.Tags.of(stack).add('project', 'PSBAPP');
  cdk.Tags.of(stack).add('environment', 'dev');
}
