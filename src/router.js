import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout'

Vue.use(Router)

export default new Router({
  mode: 'hash',

  routes: [
    {
      path: '/404',
      name: '404',
      component: () =>
        import(/* webpackChunkName: "404" */ './views/404/index.vue'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/recorder',
      name: 'recorder',
      component: () =>
        import(/* webpackChunkName: "404" */ './views/recorder-test.vue'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/login/index.vue'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/',
      redirect: '/home',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () =>
            import(/* webpackChunkName: "login" */ './views/home/index.vue'),
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/personal',
          name: 'personal',
          component: () =>
            import(/* webpackChunkName: "personal" */ '@/views/personal'),
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/publish-work',
          name: 'publish-work',
          component: () =>
            import(
              /* webpackChunkName: "publish-work" */ '@/views/publish-work'
            ),
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/work-data-statistics',
          name: 'work-data-statistics',
          component: () =>
            import(
              /* webpackChunkName: "data-statistics" */ '@/views/data-statistics'
            ),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        {
          path: '/work-data-statistics-word',
          name: 'work-data-statistics-word',
          component: () =>
            import(
              /* webpackChunkName: "data-statistics" */ '@/views/data-statistics-word'
            ),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        {
          path: '/work-answer-results',
          name: 'work-answer-results',
          component: () =>
            import(
              /* webpackChunkName: "answer-results" */ '@/views/answer-results'
            ),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        {
          path: '/work-answer-results-wordWork',
          name: 'work-answer-results-wordWork',
          component: () =>
            import(
              /* webpackChunkName: "answer-results" */ '@/views/answer-results-wordWork'
            ),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        {
          path: '/work-answer-results-english',
          name: 'work-answer-results-english',
          component: () =>
            import(
              /* webpackChunkName: "answer-results" */ '@/views/answer-results-english'
            ),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        {
          path: '/message',
          redirect: '/message/msg-received',
          name: 'message',
          component: () =>
            import(
              /* webpackChunkName: "notice" */ './views/message/index.vue'
            ),
          meta: {
            keepAlive: false
          },
          children: [
            {
              path: '/message/msg-received',
              name: 'msg-received',
              component: () =>
                import(
                  /* webpackChunkName: "message" */ './views/message/components/MessageReceived.vue'
                )
            },
            {
              path: '/message/msg-published',
              name: 'msg-published',
              component: () =>
                import(
                  /* webpackChunkName: "message" */ './views/message/components/MessagePublished.vue'
                )
            },
            {
              path: '/message/msg-publish',
              name: 'msg-publish',
              component: () =>
                import(
                  /* webpackChunkName: "message" */ './views/message/components/MessagePublish.vue'
                )
            }
          ]
        },
        {
          path: '/wrong-question',
          name: 'wrong-question',
          component: () =>
            import(
              /* webpackChunkName: "wrong-question" */ './views/wrong-question/index.vue'
            ),
          meta: {
            keepAlive: false,
            back: false
          }
        },
        {
          path: '/wrong-question-detail',
          name: 'wrong-question-detail',
          component: () =>
            import(
              /* webpackChunkName: "wrong-question-detail" */ './views/wrong-question-detail/index.vue'
            ),
          meta: {
            keepAlive: false,
            back: false
          }
        },
        {
          path: '/resource-management',
          name: 'resource-management',
          component: () =>
            import(
              /* webpackChunkName: "resource-management" */ './views/resource-management/index.vue'
            ),
          meta: {
            keepAlive: false,
            back: false
          }
        },
        {
          path: '/resource-management-upload',
          name: 'resource-management-upload',
          component: () =>
            import(
              /* webpackChunkName: "resource-upload" */ './views/resource-upload/index.vue'
            ),
          meta: {
            keepAlive: false,
            back: false
          }
        },
        {
          path: '/exercise-lecture',
          name: 'exercise-lecture',
          component: () =>
            import(
              /* webpackChunkName: "resource-upload" */ './views/exercise-lecture/index.vue'
            ),
          meta: {
            keepAlive: false,
            back: false
          }
        },
        {
          path: '/work',
          name: 'work',
          component: () =>
            import(/* webpackChunkName: "work" */ './views/work/index.vue'),
          meta: {
            keepAlive: true,
            back: true
          }
        },
        {
          path: '/work-read-data-analysis',
          name: 'readDataAnalysis',
          component: () =>
            import(
              /* webpackChunkName: "readDataAnalysis" */ './views/read-data-analysis/index.vue'
            ),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        {
          path: '/work-read-item-details',
          name: 'readItemDetails',
          component: () =>
            import(
              /* webpackChunkName: "readItemDetails" */ './views/read-item-details/index.vue'
            ),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        {
          path: '/work-read-question-details',
          name: 'read-question-details',
          component: () =>
            import(
              /* webpackChunkName: "readQuestionDetails" */ './views/read-question-detail/index.vue'
            ),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        {
          path: '/reading-training',
          name: 'readingTraining',
          component: () =>
            import(
              /* webpackChunkName: "reading" */ './views/reading-training/index.vue'
            ),
          redirect: '/reading-training/reading/read-analyze',
          children: [
            {
              path: 'reading',
              name: 'reading',
              component: () =>
                import(
                  /* webpackChunkName: "reading" */ './views/reading/index.vue'
                ),
              children: [
                {
                  path: 'read-analyze',
                  name: 'readAnalyze',
                  component: () =>
                    import(
                      /* webpackChunkName: "readAnalyze" */ './views/reading/components/ReadAnalyze.vue'
                    ),
                  meta: {
                    keepAlive: false,
                    back: true
                  }
                },
                {
                  path: 'student-analyze',
                  name: 'studentAnalyze',
                  component: () =>
                    import(
                      /* webpackChunkName: "studentAnalyze" */ './views/reading/components/StudentAnalyze.vue'
                    ),
                  meta: {
                    keepAlive: false,
                    back: true
                  }
                }
              ]
            },
            {
              path: 'catalog-details',
              name: 'catalogDetails',
              component: () =>
                import(
                  /* webpackChunkName: "catalogDetails" */ './views/catalog-details/index.vue'
                ),
              meta: {
                keepAlive: false,
                back: true
              }
            },
            {
              path: 'student-details',
              name: 'studentDetails',
              component: () =>
                import(
                  /* webpackChunkName: "studentDetails" */ './views/student-details/index.vue'
                )
            },
            {
              path: 'student-question-details',
              name: 'studentQuestionDetails',
              component: () =>
                import(
                  /* webpackChunkName: "studentQuestionDetails" */ './views/student-answer-questions-detail'
                )
            }
          ]
        },
        {
          path: '/work-composition-detail',
          name: 'work-composition-detail',
          component: () =>
            import(
              /* webpackChunkName: "composition-detail" */ './views/composition-detail/index.vue'
            ),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        {
          path: '/composition-task',
          name: 'composition-task',
          component: () => import('./views/composition-task/index.vue'),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        // {
        //   path: '/composition-one-analysis',
        //   name: 'composition-one-analysis',
        //   component: () => import('./views/composition-one-analysis/index.vue')
        // },
        // {
        //   path: '/composition-one-detail',
        //   name: 'composition-one-detail',
        //   component: () => import('./views/composition-one-detail/index.vue')
        // },
        {
          path: '/work-grading-assignment',
          name: 'work-grading-assignment',
          component: () =>
            import(
              /* webpackChunkName: "work-grading-assignment" */ './views/grading-assignment/index.vue'
            ),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        {
          path: '/grading-mark',
          name: 'grading-mark',
          component: () => import('./views/grading-mark/index.vue'),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        {
          path: '/work-composition-data-analysis',
          name: 'work-composition-data-analysis',
          component: () =>
            import('./views/composition-data-analysis/index.vue'),
          meta: {
            keepAlive: false,
            back: true
          }
        },
        // {
        //   path:'/display-wall',
        //   name:'display-wall',
        //   redirect:'/display-wall/one',
        //   component:()=>
        //     import('./views/display-wall/index.vue'),
        //     children:[
        //       {
        //         path:'one',
        //         name:'one',
        //         component:()=>
        //           import('./views/display-wall/son-w/one.vue')
        //       },
        //       {
        //         path:'two',
        //         name:'two',
        //         component:()=>
        //           import('./views/display-wall/son-w/two.vue')
        //       },
        //       {
        //         path:'three',
        //         name:'three',
        //         component:()=>
        //           import('./views/display-wall/son-w/three.vue')
        //       },
        //       {
        //         path:'four',
        //         name:'four',
        //         component:()=>
        //           import('./views/display-wall/son-w/four.vue')
        //       },
        //     ]
        // },
        // {
        //   path:'/display-wall-details',
        //   name:'display-wall-details',
        //   component:()=>
        //     import('./views/display-wall-details/index.vue')
        // },
        {
          path: '/work-marking',
          name: 'work-marking',
          component: () =>
            import(
              /* webpackChunkName: "work-marking" */ './views/work-marking/index.vue'
            ),
          meta: {
            keepAlive: false,
            back: true
          }
        }
      ]
    },
    {
      path: '/user-set',
      name: 'user-set',
      component: () =>
        import(/* webpackChunkName: "user-set" */ '@/views/user-set'),
      meta: {
        keepAlive: false,
        back: false
      }
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: () =>
        import(
          /* webpackChunkName: "forget-password" */ '@/views/forget-password'
        )
    },
    {
      path: '*',
      redirect: {
        path: '/home'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
