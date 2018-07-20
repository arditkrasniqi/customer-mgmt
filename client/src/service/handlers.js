class Handlers {
  static handleAxiosResponse(axiosResponse, resolveF, rejectF) {
    if (axiosResponse.status >= 200 && axiosResponse.status < 300) {
      let endpointResponse = {
        endpointResult: axiosResponse.data
      };
      resolveF(endpointResponse);
    }
    rejectF({
      message: 'EndpointServices: axios response problems...',
      origin: axiosResponse
    });
  }

  static handleAxiosReject(axiosRejectReason, resolveF, rejectF) {
    let endpointRejectReason = {
      message: 'EndpointServicesR1: axios rejected...',
      origin: axiosRejectReason
    };
    rejectF(endpointRejectReason);
  }

  static handleAxiosError(axiosError, resolveF, rejectF) {
    let endpointError = {
      message: 'EndpointServicesR1: error from axios...',
      origin: axiosError
    };
    rejectF(endpointError);
  }
}

export default Handlers;
