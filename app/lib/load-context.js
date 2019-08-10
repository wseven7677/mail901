import controller from './controller.js'
import service from './service.js'

const ctx = () => {
    return {
        controller,
        service,

        request: {},
        response: {},
    };
}

export default ctx;