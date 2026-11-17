import { defineConfig } from 'orval';

export default defineConfig({
    plantariumApi: {
        input: {
            target: '../backend/src/Plantarium.Api/Plantarium.Api.json',
        },
        output: {
            mode: 'tags-split',
            target: 'src/app/core/api/endpoints',
            schemas: 'src/app/core/api/models',
            client: 'angular',
            clean: true,

        },
    },
});