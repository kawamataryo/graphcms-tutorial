import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import router from './router.js'

const GRAPHCMS_API = 'https://api-apeast.graphcms.com/v1/cjlgmrqsb051401ehmtd45tsi/master'

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache()
})
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  template: '<App/>',
  components: { App }
})