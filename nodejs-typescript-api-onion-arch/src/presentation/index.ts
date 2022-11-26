import '../utils/config'
import Server from '../infra/http/server'

class BootstrapApplication {
    public static bootstrap() {
        const server = new Server()
        server
            .initializeGlobalMiddlewares()
            .initializeRoutes()
            .initializeErrorHandlers()
            .listen()
    }
}

BootstrapApplication.bootstrap()
