// import { Account, Dummies, TestConnectionResult, User } from '@models/SnowflakeModels'
// import SnowflakeRepository from '@repositories/SnowflakeRepository'
// import { flow, type Instance, types } from 'mobx-state-tree'

// export const SnowflakeUserStore = types
//   .model('SnowflakeUserStore', {
//     isLoading: types.optional(types.boolean, true),
//     selectedAccount: types.maybeNull(types.reference(Account)),
//     // ui
//     sortType: types.optional(types.string, 'name'),
//     ascOrDesc: types.optional(types.string, 'asc'),
//     selectedUser: types.maybeNull(types.safeReference(User)),
//     isEditPopupOpen: types.optional(types.boolean, false),
//   })
//   .actions((self) => ({
//     setAccount: (selected: Instance<typeof Account> | null) => {
//       self.selectedAccount = selected
//     },
//     setUsers: flow(function* () {
//       if (self.selectedAccount) {
//         self.isLoading = true
//         self.selectedAccount.clearUsers()

//         const result = yield SnowflakeRepository.getUsers(self.selectedAccount.accountId)
//         self.selectedAccount.setUsers(result)

//         self.isLoading = false
//       }
//     }),

//     deleteUser: flow(function* (name: string) {
//       if (self.selectedAccount) {
//         yield SnowflakeRepository.deleteUser(self.selectedAccount.accountId, name)
//       }
//     }),
//     setLoading: (isLoading: boolean) => {
//       self.isLoading = isLoading
//     },
//     setSortType: (type: 'name' | 'email' | 'hasPassword' | 'hasRsaPublicKey') => {
//       self.sortType = type
//     },
//     setAscOrDesc: (ascOrDesc: 'asc' | 'desc') => {
//       self.ascOrDesc = ascOrDesc
//     },
//     toggleEditPopup: (state: boolean) => {
//       self.isEditPopupOpen = state
//     },
//     setSelectedUser: (user: Instance<typeof User>) => {
//       self.selectedUser = user
//     },
//     clearSelectedUser: () => {
//       self.selectedUser = null
//     },
//     grantRoleToUser: flow(function* (roleName: string, userName: string) {
//       if (self.selectedAccount) {
//         yield SnowflakeRepository.grantRoleToUser(self.selectedAccount.accountId, roleName, userName)
//       }
//     }),
//     revokeRoleToUser: flow(function* (roleName: string, userName: string) {
//       if (self.selectedAccount) {
//         yield SnowflakeRepository.revokeRoleToUser(self.selectedAccount.accountId, roleName, userName)
//       }
//     }),
//     getUserInfo: flow(function* (userId: string) {
//       if (self.selectedAccount) {
//         return yield SnowflakeRepository.getUser(self.selectedAccount.accountId, userId)
//       }
//     }),
//     testConnection: flow(function* (userId: string, privateKey: File, isEncrypted: boolean, passphrase: string | undefined) {
//       let testResult = TestConnectionResult.create()
//       if (self.selectedAccount) {
//         const result = yield SnowflakeRepository.testConnection(self.selectedAccount.accountId, userId, privateKey, isEncrypted, passphrase)
//         testResult = TestConnectionResult.create(result)
//       }
//       return testResult
//     }),
//   }))
//   .views((self) => ({
//     users() {
//       if (self.selectedAccount) {
//         const users = self.selectedAccount.users.filter((u) => !u.isAdminUser && !u.disabled)

//         switch (self.sortType) {
//           case 'name':
//             return users.slice().sort((a, b) => {
//               const aText = a.isEmailId ? (a.bdsUserInfo.empName ? a.bdsUserInfo.empName : '') : a.name
//               const bText = b.isEmailId ? (b.bdsUserInfo.empName ? b.bdsUserInfo.empName : '') : b.name
//               const options: Intl.CollatorOptions = { numeric: true, sensitivity: 'base', usage: 'sort' }
//               return self.ascOrDesc === 'asc' ? aText.localeCompare(bText, 'en', options) : bText.localeCompare(aText, 'en', options)
//             })
//           case 'email':
//             return users.slice().sort((a, b) => {
//               return self.ascOrDesc === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)
//             })
//           case 'hasPassword':
//             return users.slice().sort((a, b) => {
//               const compareResult = self.ascOrDesc === 'asc' ? 1 : -1
//               return compareResult * (Number(a.hasPassword) - Number(b.hasPassword))
//             })

//           case 'hasRsaPublicKey':
//             return users.slice().sort((a, b) => {
//               const compareResult = self.ascOrDesc === 'asc' ? -1 : 1
//               return compareResult * (Number(a.hasRsaPublicKey) - Number(b.hasRsaPublicKey))
//             })

//           default:
//             return users
//         }
//       } else {
//         return Dummies.create().users
//       }
//     },
//   }))
