import '../utils/config'
import Server from '../infra/http/server'

class BootstrapApplication {
    public static start() {
        const server = new Server()
        server
            .initializeGlobalMiddlewares()
            .initializeErrorHandlers()
            .initializeRoutes()
            .listen()
    }
}

BootstrapApplication.start()
