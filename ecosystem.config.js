module.exports = {
    apps: [{
            name: "app1",
            script: "npm",
            arg: "start",
            env_production: {
                NODE_ENV: "production"
            },
            env_development: {
                NODE_ENV: "development"
            }
        },
        // {
        //     name: "app1",
        //     script: "server.js",
        //     env_production: {
        //         NODE_ENV: "production"
        //     },
        //     env_development: {
        //         NODE_ENV: "development"
        //     }
        // }
    ]
}