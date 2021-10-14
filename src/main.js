import Vue from 'vue'  
import App from './App.vue' 
import router from './router' 
import store from './store' 
import Amplify, * as AmplifyModules from 'aws-amplify'; 
import { AmplifyPlugin } from 'aws-amplify-vue'; 
// import aws_exports from './aws-exports';
// Amplify.configure(aws_exports);

function getCognitoAuthConfig() { 
  switch (window.location.hostname) { 
    case 'localhost': 
      return { 
        userPoolId: 'us-east-2_j6wdy585w',//'us-east-2_b4ginRpi2', //UserPool ID
        region: 'us-east-2',
        userPoolWebClientId: '43m2kpmau407vk5mj09ebolgvq',
        // userPoolId: 'us-east-2_x845Mkx5c', //'us-east-2_b4ginRpi2', //UserPool ID
        // region: 'us-east-2',
        // userPoolWebClientId: '5q6nj3hm0ekldsl4ofd67vmunq',//'1atjvpdlhuu693fdgchtiil26e',
        oauth: { 
          scope: [ 
            'email',
            'profile', 
            'openid',
            'aws.cognito.signin.user.admin', 
          ],
          responseType: 'code',
        },
      };

    default: 
      console.warn(`Unknown host for user pool : ${window.location.hostname}`); 
  }
}
Amplify.configure({ 
  Auth: getCognitoAuthConfig(), 
});
Vue.use(AmplifyPlugin, AmplifyModules); 

Vue.config.productionTip = false 

new Vue({ 
  router,
  store,
  render: h => h(App) 
}).$mount('#app')
