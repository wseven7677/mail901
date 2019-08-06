import controller from './controller/controller.js'
import service from './service/service.js'

const ctx = () => {
    return {
        controller,
        service,

        request: {},
        response: {},
    };
}

export default ctx;