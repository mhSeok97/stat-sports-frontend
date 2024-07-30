// import { UiDataCookie } from '@models/AppModels'
// import { DatahubUser } from '@models/User'
// import UserRepository from '@repositories/UserRepository'
// import { BdsUserStore } from '@stores/BdsUserStore'
// import { DatahubAppStore } from '@stores/DatahubAppStore'
// import { DepartmentStore } from '@stores/DepartmentStore'
// import { SnowflakeStore } from '@stores/SnowflakeStore'
// import { getCookies, getUiCookieName } from '@utils/Cookie'
// import { flow, type Instance, types } from 'mobx-state-tree'
// import { type SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic'

// export const AppStore = types
//   .model({
//     // ui
//     isReady: types.optional(types.boolean, false),
//     selectedMenu: types.optional(types.string, ''),
//     user: types.maybeNull(DatahubUser),
//     loadingArr: types.optional(types.array(types.boolean), []),
//     isLoadingGames: types.optional(types.boolean, false),
//     hasGlobalMessage: types.optional(types.boolean, false),
//     instantMessage: types.optional(types.string, ''),
//     instantTitle: types.optional(types.string, ''),
//     instantColor: types.optional(types.string, 'teal'),

//     // store
//     bdsUserStore: BdsUserStore,
//     departmentStore: DepartmentStore,
//     snowflakeStore: SnowflakeStore,
//     datahubAppStore: DatahubAppStore,

//     // cookie
//     UiDataCookie: types.optional(UiDataCookie, {
//       snowflake: {
//         viewType: 'ACCOUNT:CARD DATABASE:CARD WAREHOUSE:CARD USER:CARD ROLE:CARD SHARE:GRAPH',
//         sortType: 'ACCOUNT:NAME,ASC DATABASE:NAME,ASC WAREHOUSE:NAME,ASC USER:NAME,ASC ROLE:NAME,ASC SHARE:NAME,ASC',
//       },
//       datahub: {
//         viewType: 'APP:CARD',
//         sortType: 'APP:NAME,ASC',
//       },
//     }),
//   })
//   .actions((self) => {
//     const afterCreate = flow(function* () {
//       try {
//         yield getMe()
//       } catch (e) {
//         if (!sessionStorage.getItem('refreshed')) {
//           sessionStorage.setItem('refreshed', 'true')
//           window.location.reload()
//         }
//       }
//     })

//     const getMe = flow(function* () {
//       const me = yield UserRepository.getMe()
//       if (me) {
//         self.user = DatahubUser.create({
//           empID: me.empId,
//           no: me.empNo,
//           name: me.empKorName,
//           email: me.empEmail,
//           teamCode: me.teamCode,
//           teamName: me.teamName,
//           companyCode: me.cmpCode,
//           companyName: me.cmpName,
//           datahubRoles: me.datahubRoles,
//           snowflakeAccountList: me.snowflakeAccountList,
//         })
//         setReady(true)
//       }
//     })

//     const setMenu = (name: string) => {
//       self.selectedMenu = name
//     }

//     const setReady = (isReady: boolean) => {
//       self.isReady = isReady
//     }

//     const initInstantMessage = () => {
//       self.instantMessage = ''
//       self.instantTitle = ''
//     }

//     const showInstantMessage = (msg: string, title = '', color: SemanticCOLORS) => {
//       self.hasGlobalMessage = true
//       self.instantMessage = msg
//       self.instantTitle = title
//       self.instantColor = color
//     }

//     const showErrorMessage = (msg: string) => {
//       showInstantMessage(msg, '에러 발생', 'red')
//     }

//     const showSuccessMessage = (msg: string) => {
//       showInstantMessage(msg, '완료', 'teal')
//     }

//     const showPromiseSettled = (result: PromiseSettledResult<any>[]) => {
//       const success = result.filter((item) => item.status === 'fulfilled').length
//       const fail = result.filter((item) => item.status === 'rejected').length
//       const total = success + fail

//       if (fail > 0) {
//         showErrorMessage(
//           'total: ' +
//             total +
//             ' success: ' +
//             result.filter((item) => item.status === 'fulfilled').length +
//             ' failed: ' +
//             result.filter((item) => item.status === 'rejected').length,
//         )
//       } else {
//         showSuccessMessage(
//           'total: ' +
//             total +
//             ' success: ' +
//             result.filter((item) => item.status === 'fulfilled').length +
//             ' failed: ' +
//             result.filter((item) => item.status === 'rejected').length,
//         )
//       }
//     }

//     const hideInstantMessage = () => {
//       self.hasGlobalMessage = false
//     }

//     const setCookie = () => {
//       try {
//         const cookieValues: Instance<typeof UiDataCookie> = getCookies(getUiCookieName())
//         if (cookieValues) {
//           self.UiDataCookie = cookieValues
//         }
//       } catch (e) {
//         console.error(e)
//       }
//     }

//     const setCookieValue = (appName: 'snowflake' | 'datahub', typeName: 'viewType' | 'sortType', value: string) => {
//       if (appName === 'snowflake') {
//         if (typeName === 'viewType') {
//           self.UiDataCookie.snowflake.viewType = value
//         } else if (typeName === 'sortType') {
//           self.UiDataCookie.snowflake.sortType = value
//         }
//       } else if (appName === 'datahub') {
//         if (typeName === 'viewType') {
//           self.UiDataCookie.datahub.viewType = value
//         } else if (typeName === 'sortType') {
//           self.UiDataCookie.datahub.sortType = value
//         }
//       }
//     }

//     return {
//       getMe,
//       setMenu,
//       afterCreate,
//       initInstantMessage,
//       showErrorMessage,
//       showSuccessMessage,
//       showPromiseSettled,
//       hideInstantMessage,
//       showInstantMessage,
//       setCookie,
//       setCookieValue,
//     }
//   })
//   .views((self) => ({
//     get isLogin() {
//       return self.user
//     },
//     get profileImage() {
//       return `https://hrweb.weboffice.co.kr/images/emp/NX/${self.user!.no}.jpg`
//     },
//     get isAllReady() {
//       return self.isReady
//     },
//     isSelected(name: string) {
//       return self.selectedMenu === name
//     },
//     get isAdmin() {
//       return self.user && self.user.isAdmin
//     },
//   }))

// export interface IAppStore extends Instance<typeof AppStore> {}
