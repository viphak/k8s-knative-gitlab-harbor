(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{364:function(t,s,a){t.exports=a.p+"assets/img/GitLab.dd7e0dbb.png"},382:function(t,s,a){"use strict";a.r(s);var e=a(19),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"install-gitlab"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#install-gitlab"}},[t._v("#")]),t._v(" Install GitLab")]),t._v(" "),e("p",[t._v("Add GitLab repository:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("helm repo "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" gitlab https://charts.gitlab.io/\nhelm repo update\n")])])]),e("p",[t._v("Create "),e("code",[t._v("gitlab")]),t._v(" namespaces with secrets needed for GitLab\n(certificates and passwords):")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("kubectl create namespace gitlab\nkubectl create secret generic gitlab-initial-root-password --from-literal"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("password"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"admin123"')]),t._v(" -n gitlab\nkubectl create secret generic custom-ca --from-file"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("unique_name"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("tmp/fakelerootx1.pem -n gitlab\n")])])]),e("p",[t._v('Create Istio Gateways and VirtualServices to allow accessing GitLab from\n"outside":')]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("cat")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<<")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("EOF"),e("span",{pre:!0,attrs:{class:"token bash punctuation"}},[t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" kubectl apply -f -")]),t._v("\napiVersion: networking.istio.io/v1alpha3\nkind: Gateway\nmetadata:\n  name: gitlab-gateway\n  namespace: gitlab\nspec:\n  selector:\n    istio: ingressgateway\n  servers:\n  - port:\n      number: 22\n      name: ssh-gitlab\n      protocol: TCP\n    hosts:\n    - gitlab."),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${MY_DOMAIN}")]),t._v("\n  - port:\n      number: 80\n      name: http-gitlab\n      protocol: HTTP\n    hosts:\n    - gitlab."),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${MY_DOMAIN}")]),t._v("\n    - minio."),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${MY_DOMAIN}")]),t._v("\n    tls:\n      httpsRedirect: true\n  - port:\n      number: 443\n      name: https-gitlab\n      protocol: HTTPS\n    hosts:\n    - gitlab."),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${MY_DOMAIN}")]),t._v("\n    - minio."),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${MY_DOMAIN}")]),t._v("\n    tls:\n      credentialName: ingress-cert-"),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${LETSENCRYPT_ENVIRONMENT}")]),t._v("\n      mode: SIMPLE\n      privateKey: sds\n      serverCertificate: sds\n---\napiVersion: networking.istio.io/v1alpha3\nkind: VirtualService\nmetadata:\n  name: gitlab-ssh-virtual-service\n  namespace: gitlab\nspec:\n  hosts:\n  - gitlab."),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${MY_DOMAIN}")]),t._v("\n  gateways:\n  - gitlab-gateway\n  tcp:\n  - match:\n    - port: 22\n    route:\n    - destination:\n        host: gitlab-gitlab-shell.gitlab.svc.cluster.local\n        port:\n          number: 22\n---\napiVersion: networking.istio.io/v1alpha3\nkind: VirtualService\nmetadata:\n  name: gitlab-http-virtual-service\n  namespace: gitlab\nspec:\n  hosts:\n  - gitlab."),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${MY_DOMAIN}")]),t._v("\n  gateways:\n  - gitlab-gateway\n  http:\n  - match:\n    - uri:\n        prefix: /admin/sidekiq\n    route:\n    - destination:\n        host: gitlab-unicorn.gitlab.svc.cluster.local\n        port:\n          number: 8080\n  - route:\n    - destination:\n        host: gitlab-unicorn.gitlab.svc.cluster.local\n        port:\n          number: 8181\n---\napiVersion: networking.istio.io/v1alpha3\nkind: VirtualService\nmetadata:\n  name: gitlab-minio-virtual-service\n  namespace: gitlab\nspec:\n  hosts:\n  - minio."),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${MY_DOMAIN}")]),t._v("\n  gateways:\n  - gitlab-gateway\n  http:\n  - route:\n    - destination:\n        host: gitlab-minio-svc.gitlab.svc.cluster.local\n        port:\n          number: 9000\nEOF")]),t._v("\n")])])]),e("p",[t._v("Install GitLab using Helm:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("helm "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" gitlab gitlab/gitlab --namespace gitlab --wait --version "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2.6")]),t._v(".0 "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set certmanager.install"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("false "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set gitlab-runner.install"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("false "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set gitlab.gitaly.persistence.size"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("1Gi "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set gitlab.unicorn.ingress.enabled"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("false "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.appConfig.cron_jobs.ci_archive_traces_cron_worker.cron"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"17 * * * *"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.appConfig.cron_jobs.expire_build_artifacts_worker.cron"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"50 * * * *"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.appConfig.cron_jobs.pipeline_schedule_worker.cron"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"19 * * * *"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.appConfig.cron_jobs.repository_archive_cache_worker.cron"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0 * * * *"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.appConfig.cron_jobs.repository_check_worker.cron"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"20 * * * *"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.appConfig.cron_jobs.stuck_ci_jobs_worker.cron"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"0 * * * *"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.appConfig.gravatar.plainUrl"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://www.gravatar.com/avatar/%{hash}?s=%{size}&d=identicon"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.appConfig.gravatar.sslUrl"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://secure.gravatar.com/avatar/%{hash}?s=%{size}&d=identicon"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.certificates.customCAs"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(".secret"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("custom-ca "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.edition"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("ce "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.hosts.domain"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${MY_DOMAIN}")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.ingress.configureCertmanager"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("false "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.ingress.enabled"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("false "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set global.initialRootPassword.secret"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("gitlab-initial-root-password "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set minio.persistence.size"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("5Gi "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set nginx-ingress.enabled"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("false "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set postgresql.persistence.size"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("1Gi "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set prometheus.install"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("false "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set redis.persistence.size"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("1Gi "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  --set registry.enabled"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("false\n")])])]),e("p",[t._v("Output:")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("NAME: gitlab\nLAST DEPLOYED: Fri Dec 27 10:57:01 2019\nNAMESPACE: gitlab\nSTATUS: deployed\nREVISION: 1\nNOTES:\nWARNING: Automatic TLS certificate generation with cert-manager is disabled and no TLS certificates were provided. Self-signed certificates were generated.\n\nYou may retrieve the CA root for these certificates from the `gitlab-wildcard-tls-ca` secret, via the following command. It can then be imported to a web browser or system store.\n\n    kubectl get secret gitlab-wildcard-tls-ca -ojsonpath='{.data.cfssl_ca}' | base64 --decode > gitlab.mylabs.dev.ca.pem\n\nIf you do not wish to use self-signed certificates, please set the following properties:\n  - global.ingress.tls.secretName\n  OR\n  - gitlab.unicorn.ingress.tls.secretName\n  - minio.ingress.tls.secretName\n")])])]),e("p",[t._v("Try to access the GitLab using the URL "),e("a",{attrs:{href:"https://gitlab.mylabs.dev",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://gitlab.mylabs.dev"),e("OutboundLink")],1),t._v("\nwith following credentials:")]),t._v(" "),e("ul",[e("li",[t._v("Username: "),e("code",[t._v("root")])]),t._v(" "),e("li",[t._v("Password: "),e("code",[t._v("admin123")])])]),t._v(" "),e("p",[t._v("Create Personal Access Token "),e("code",[t._v("1234567890")]),t._v(" for user "),e("code",[t._v("root")]),t._v(":")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("UNICORN_POD")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),t._v("kubectl get pods -n gitlab -l"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("app"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("unicorn -o "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("jsonpath")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"{.items[0].metadata.name}"')]),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${UNICORN_POD}")]),t._v("\nkubectl "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("exec")]),t._v(" -n gitlab -it "),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$UNICORN_POD")]),t._v(" -c unicorn -- /bin/bash -c "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"\ncd /srv/gitlab;\nbin/rails r '),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("\ntoken_digest = Gitlab::CryptoHelper.sha256 "),e("span",{pre:!0,attrs:{class:"token entity",title:"\\\\"}},[t._v("\\\\")]),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("1234567890"),e("span",{pre:!0,attrs:{class:"token entity",title:"\\\\"}},[t._v("\\\\")]),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(";\ntoken=PersonalAccessToken.create!(name: "),e("span",{pre:!0,attrs:{class:"token entity",title:"\\\\"}},[t._v("\\\\")]),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("Full Access"),e("span",{pre:!0,attrs:{class:"token entity",title:"\\\\"}},[t._v("\\\\")]),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(", scopes: [:api], user: User.where(id: 1).first, token_digest: token_digest);\ntoken.save!\n"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(';\n"')]),t._v("\n")])])]),e("p",[t._v("Output:")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("gitlab-unicorn-566c465dc4-4dwdz\n")])])]),e("p",[t._v("Create new user "),e("code",[t._v("myuser")]),t._v(":")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("GITLAB_USER_ID")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -s -k -X POST -H "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Content-type: application/json"')]),t._v(" -H "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"PRIVATE-TOKEN: 1234567890"')]),t._v(" https://gitlab.$"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("MY_DOMAIN"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/api/v4/users -d "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"{\n  '),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("name"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("myuser"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(",\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("username"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("myuser"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(",\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("password"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("myuser_password"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(",\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("email"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("myuser@"),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${MY_DOMAIN}")]),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(",\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("skip_confirmation"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(': true\n}"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" jq "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('".id"')]),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${GITLAB_USER_ID}")]),t._v("\n")])])]),e("p",[t._v("Output:")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("2\n")])])]),e("p",[t._v("Create a personal access token for user "),e("code",[t._v("myuser")]),t._v(":")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("kubectl "),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("exec")]),t._v(" -n gitlab -it "),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$UNICORN_POD")]),t._v(" -c unicorn -- /bin/bash -c "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"\ncd /srv/gitlab;\nbin/rails r '),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("\ntoken_digest = Gitlab::CryptoHelper.sha256 "),e("span",{pre:!0,attrs:{class:"token entity",title:"\\\\"}},[t._v("\\\\")]),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("0987654321"),e("span",{pre:!0,attrs:{class:"token entity",title:"\\\\"}},[t._v("\\\\")]),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(";\ntoken=PersonalAccessToken.create!(name: "),e("span",{pre:!0,attrs:{class:"token entity",title:"\\\\"}},[t._v("\\\\")]),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("Full Access"),e("span",{pre:!0,attrs:{class:"token entity",title:"\\\\"}},[t._v("\\\\")]),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(", scopes: [:api], user: User.where(id: "),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${GITLAB_USER_ID}")]),t._v(").first, token_digest: token_digest);\ntoken.save!\n"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(';\n"')]),t._v("\n")])])]),e("p",[t._v("Create Impersonation token for "),e("code",[t._v("myuser")]),t._v(":")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("GILAB_MYUSER_TOKEN")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -s -k -X POST -H "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Content-type: application/json"')]),t._v(" -H "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"PRIVATE-TOKEN: 1234567890"')]),t._v(" https://gitlab.$"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("MY_DOMAIN"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/api/v4/users/$"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("GITLAB_USER_ID"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/impersonation_tokens -d "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"{\n  '),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("name"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("mytoken"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(",\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("scopes"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": ["),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("api"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(']\n}"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" jq -r "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('".token"')]),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${GILAB_MYUSER_TOKEN}")]),t._v("\n")])])]),e("p",[t._v("Output:")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("t_dJwRNpVkdsxWzs3Yv3\n")])])]),e("p",[t._v("Create SSH key which will be imported to GitLab:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("ssh-keygen -t ed25519 -f tmp/id_rsa_gitlab -q -N "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v(" -C "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"my_ssh_key@mylabs.dev"')]),t._v("\n")])])]),e("p",[t._v("Add ssh key to the "),e("code",[t._v("myuser")]),t._v(":")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -sk -X POST -F "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"private_token='),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${GILAB_MYUSER_TOKEN}")]),t._v('"')]),t._v(" https://gitlab."),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${MY_DOMAIN}")]),t._v("/api/v4/user/keys -F "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"title=my_ssh_key"')]),t._v(" -F "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"key='),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("cat")]),t._v(" tmp/id_rsa_gitlab.pub"),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v('"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" jq\n")])])]),e("p",[t._v("Output:")]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"title"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"my_ssh_key"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"key"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKH2+gqsWrziaAmzGumc/frT0EBMSrXSP0MT/jRcKwtm my_ssh_key@mylabs.dev"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"created_at"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2019-12-27T10:01:45.403Z"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("Create new project:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("PROJECT_ID")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token variable"}},[e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" -s -k -X POST -H "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Content-type: application/json"')]),t._v(" -H "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"PRIVATE-TOKEN: 1234567890"')]),t._v(" https://gitlab.$"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("MY_DOMAIN"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("/api/v4/projects/user/$"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("GITLAB_USER_ID"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" -d "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"{\n  '),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("user_id"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${GITLAB_USER_ID}")]),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(",\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("name"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("my-podinfo"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(",\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("description"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("My Test Project"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(",\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("wiki_access_level"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("disabled"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(",\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("issues_access_level"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("disabled"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(",\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("builds_access_level"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("disabled"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(",\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("snippets_access_level"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("disabled"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(",\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("container-registry-enabled"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": false,\n  "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("visibility"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v(": "),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v("public"),e("span",{pre:!0,attrs:{class:"token entity",title:'\\"'}},[t._v('\\"')]),t._v('\n}"')]),t._v(" "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" jq -r "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('".id"')]),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${PROJECT_ID}")]),t._v("\n")])])]),e("p",[t._v("Output:")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("1\n")])])]),e("p",[t._v("Clone the "),e("a",{attrs:{href:"https://github.com/stefanprodan/podinfo",target:"_blank",rel:"noopener noreferrer"}},[t._v("podinfo"),e("OutboundLink")],1),t._v(" project and push\nit to the newly created git repository "),e("code",[t._v("my-podinfo")]),t._v(":")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t._v("GIT_SSH_COMMAND")]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ssh -i '),e("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PWD")]),t._v('/tmp/id_rsa_gitlab -o UserKnownHostsFile=/dev/null"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone --bare https://github.com/stefanprodan/podinfo tmp/podinfo\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" -C tmp/podinfo push --mirror git@gitlab."),e("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${MY_DOMAIN}")]),t._v(":myuser/my-podinfo.git\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v(" -rf tmp/podinfo\n")])])]),e("p",[t._v("Output:")]),t._v(" "),e("div",{staticClass:"language-text extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("loning into bare repository 'tmp/podinfo'...\nremote: Enumerating objects: 10, done.\nremote: Counting objects: 100% (10/10), done.\nremote: Compressing objects: 100% (10/10), done.\nremote: Total 5266 (delta 0), reused 3 (delta 0), pack-reused 5256\nReceiving objects: 100% (5266/5266), 9.52 MiB | 1.28 MiB/s, done.\nResolving deltas: 100% (2342/2342), done.\nWarning: Permanently added 'gitlab.mylabs.dev,18.184.227.16' (ECDSA) to the list of known hosts.\nEnumerating objects: 5266, done.\nCounting objects: 100% (5266/5266), done.\nDelta compression using up to 4 threads\nCompressing objects: 100% (2544/2544), done.\nWriting objects: 100% (5266/5266), 9.52 MiB | 6.95 MiB/s, done.\nTotal 5266 (delta 2342), reused 5266 (delta 2342)\nremote: Resolving deltas: 100% (2342/2342), done.\nremote:\nremote: To create a merge request for gh-pages, visit:\nremote:   https://gitlab.mylabs.dev/myuser/my-podinfo/merge_requests/new?merge_request%5Bsource_branch%5D=gh-pages\nremote:\nremote: To create a merge request for v0.x, visit:\nremote:   https://gitlab.mylabs.dev/myuser/my-podinfo/merge_requests/new?merge_request%5Bsource_branch%5D=v0.x\nremote:\nremote: To create a merge request for v1.x, visit:\nremote:   https://gitlab.mylabs.dev/myuser/my-podinfo/merge_requests/new?merge_request%5Bsource_branch%5D=v1.x\nremote:\nremote: To create a merge request for v3.x, visit:\nremote:   https://gitlab.mylabs.dev/myuser/my-podinfo/merge_requests/new?merge_request%5Bsource_branch%5D=v3.x\nremote:\nTo gitlab.mylabs.dev:myuser/my-podinfo.git\n * [new branch]      gh-pages -> gh-pages\n * [new branch]      master -> master\n * [new branch]      v0.x -> v0.x\n * [new branch]      v1.x -> v1.x\n * [new branch]      v3.x -> v3.x\n * [new tag]         0.2.2 -> 0.2.2\n * [new tag]         2.0.0 -> 2.0.0\n * [new tag]         2.0.1 -> 2.0.1\n * [new tag]         2.0.2 -> 2.0.2\n * [new tag]         2.1.0 -> 2.1.0\n * [new tag]         2.1.1 -> 2.1.1\n * [new tag]         2.1.2 -> 2.1.2\n * [new tag]         2.1.3 -> 2.1.3\n * [new tag]         3.0.0 -> 3.0.0\n * [new tag]         3.1.0 -> 3.1.0\n * [new tag]         3.1.1 -> 3.1.1\n * [new tag]         3.1.2 -> 3.1.2\n * [new tag]         3.1.3 -> 3.1.3\n * [new tag]         3.1.4 -> 3.1.4\n * [new tag]         3.1.5 -> 3.1.5\n * [new tag]         flux-floral-pine-16 -> flux-floral-pine-16\n * [new tag]         flux-thawing-star-34 -> flux-thawing-star-34\n * [new tag]         v0.4.0 -> v0.4.0\n * [new tag]         v0.5.0 -> v0.5.0\n * [new tag]         v1.0.0 -> v1.0.0\n * [new tag]         v1.1.0 -> v1.1.0\n * [new tag]         v1.1.1 -> v1.1.1\n * [new tag]         v1.2.0 -> v1.2.0\n * [new tag]         v1.2.1 -> v1.2.1\n * [new tag]         v1.3.0 -> v1.3.0\n * [new tag]         v1.3.1 -> v1.3.1\n * [new tag]         v1.4.0 -> v1.4.0\n * [new tag]         v1.4.1 -> v1.4.1\n * [new tag]         v1.4.2 -> v1.4.2\n * [new tag]         v1.6.0 -> v1.6.0\n * [new tag]         v1.7.0 -> v1.7.0\n * [new tag]         v1.8.0 -> v1.8.0\n")])])]),e("p",[t._v("GitLab Screenshot:")]),t._v(" "),e("p",[e("img",{attrs:{src:a(364),alt:"GitLab",title:"GitLab"}})])])}),[],!1,null,null,null);s.default=n.exports}}]);