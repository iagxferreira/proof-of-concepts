import type {Router} from 'express';
import type {PluginEnvironment} from '../types';

import {CatalogBuilder} from '@backstage/plugin-catalog-backend';
import {ScaffolderEntitiesProcessor} from '@backstage/plugin-scaffolder-backend';
import {
    LdapOrgEntityProvider as LDAPImmobiliare, LdapOrgReaderProcessor,
} from '@backstage/plugin-catalog-backend-module-ldap';

import { LdapOrgEntityProvider } from '@backstage/plugin-catalog-backend-module-ldap';


export default async function createPlugin(
    env: PluginEnvironment,
): Promise<Router> {
    const builder = await CatalogBuilder.create(env);

    builder.addEntityProvider(
        LdapOrgEntityProvider.fromConfig(env.config, {
            id: 'admin',
            target: 'ldap://localhost:1389',
            logger: env.logger,
            schedule: env.scheduler.createScheduledTaskRunner({
                frequency: { minutes: 1 },
                timeout: { minutes: 15 },
            }),
        }),
    );

    builder.addProcessor(
        LdapOrgReaderProcessor.fromConfig(env.config, {
            logger: env.logger,
        }),
    );

    builder.addEntityProvider(
        LDAPImmobiliare.fromConfig(env.config, {
            id: 'admin',
            target: 'ldap://localhost:1389',
            logger: env.logger,
            schedule: env.scheduler.createScheduledTaskRunner({
                frequency: {minutes: 60},
                timeout: {minutes: 15},
            }),
        }),
    );

    builder.addProcessor(new ScaffolderEntitiesProcessor());
    const {processingEngine, router} = await builder.build();
    await processingEngine.start();
    return router;
}