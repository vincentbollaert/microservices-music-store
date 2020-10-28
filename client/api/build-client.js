const axios = require("axios")

const buildClient = (context) => {
  // getInitialProps also runs when navigating between pages, so need to know if this is exeuted by browser or server
  // also, nginx looks at host to determine routing rules. for node need to set this manually as not part of url
  // so need to set host header, but also cookie header (usually handled by browser), so just set all from req object
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: context.req.headers
    })
  } else {
    return axios.create({
      baseURL: ''
    })
  }
}

export default buildClient
