// import { AppConfig } from '@configs/AppConfig'
// import { Account, AccountTag } from '@models/SnowflakeModels'
// import SnowflakeRepository from '@repositories/SnowflakeRepository'
// import { SnowflakeCutieStore } from '@stores/SnowflakeCutieStore'
// import { SnowflakeDatabaseStore } from '@stores/SnowflakeDatabaseStore'
// import { SnowflakeRoleStore } from '@stores/SnowflakeRoleStore'
// import { SnowflakeShareStore } from '@stores/SnowflakeShareStore'
// import { SnowflakeUserStore } from '@stores/SnowflakeUserStore'
// import { SnowflakeWarehouseStore } from '@stores/SnowflakeWarehouseStore'
// import { flow, type Instance, types } from 'mobx-state-tree'

// export const SnowflakeAccountStore = types
//   .model('SnowflakeAccountStore', {
//     isReady: types.optional(types.boolean, false),
//     accounts: types.array(Account),
//     userStore: SnowflakeUserStore,
//     roleStore: SnowflakeRoleStore,
//     databaseStore: SnowflakeDatabaseStore,
//     warehouseStore: SnowflakeWarehouseStore,
//     shareStore: SnowflakeShareStore,
//     cutieStore: SnowflakeCutieStore,
//     selectedAccount: types.maybeNull(types.reference(Account)),
//     sortType: types.optional(types.string, 'name'),
//     ascOrDesc: types.optional(types.string, 'asc'),
//     searchType: types.optional(types.string, 'account'),
//     searchInputValue: types.optional(types.string, ''),
//     accountTags: types.maybeNull(types.array(AccountTag)),
//     selectedTagName: types.maybeNull(types.string),
//     searchTagValues: types.optional(types.array(types.string), []),
//     isAllView: types.optional(types.boolean, true),
//     myAccountList: types.optional(types.array(types.string), []),
//     isSyncing: types.optional(types.boolean, false),
//     activeTabIndex: types.optional(types.number, 1),
//     isSyncPopupOpen: types.optional(types.boolean, false),
//   })
//   .actions((self) => ({
//     async afterCreate() {
//       await this.setAccounts()
//       this.setReady()
//     },
//     setAccounts: flow(function* () {
//       if (self.accounts.length == 0) {
//         const accounts = yield SnowflakeRepository.getAccounts()
//         self.accounts = accounts
//         self.cutieStore.accounts = accounts
//       }
//     }),

//     setAccount: (accountName: string | null | undefined = null) => {
//       const selection = self.accounts.find((o) => o.accountId === accountName)
//       let selected: Instance<typeof Account> | null = null
//       if (selection) {
//         selected = selection
//       }

//       self.selectedAccount = selected
//       self.userStore.setAccount(selected)
//       self.roleStore.setAccount(selected)
//       self.databaseStore.setAccount(selected)
//       self.warehouseStore.setAccount(selected)
//       self.shareStore.setAccount(selected)
//     },
//     setReady(isReady = true) {
//       self.isReady = isReady
//     },
//     setSortType: (type: 'name' | 'date') => {
//       self.sortType = type
//     },
//     setAscOrDesc: (ascOrDesc: 'asc' | 'desc') => {
//       self.ascOrDesc = ascOrDesc
//     },
//     setSearchType: (type: 'account' | 'tag') => {
//       self.searchType = type
//     },
//     setSearchInputValue: (value: string) => {
//       self.searchInputValue = value
//     },
//     setAccountTags: flow(function* () {
//       self.accountTags = yield SnowflakeRepository.getAccountTags()
//     }),
//     addAccountTagMapping: flow(function* (tagName: string, accountLocator: string) {
//       yield SnowflakeRepository.postAccountTagMapping(tagName, accountLocator)
//     }),
//     deleteAccountTagMapping: flow(function* (tagName: string, accountLocator: string) {
//       yield SnowflakeRepository.deleteAccountTagMapping(tagName, accountLocator)
//     }),
//     setSelectedAccountTag: (tagName: string) => {
//       self.selectedTagName = tagName
//     },
//     clearSelectedAccountTag: () => {
//       self.selectedTagName = null
//     },
//     setSearchTagValues: (tagNames: string[]) => {
//       self.searchTagValues.clear()

//       for (const tagName of tagNames) {
//         self.searchTagValues.push(tagName)
//       }
//     },
//     setIsAllView: (state: boolean) => {
//       self.isAllView = state
//     },
//     setMyAccountList: (accountList: string[]) => {
//       self.myAccountList.clear()
//       accountList.map((account) => self.myAccountList.push(account))
//     },
//     setIsSyncing: (state: boolean) => {
//       self.isSyncing = state
//     },
//     setActiveTabIndex: (idx: number) => {
//       self.activeTabIndex = idx
//     },
//     toggleSyncPopup: (state: boolean) => {
//       self.isSyncPopupOpen = state
//     },
//     syncAccount: flow(function* (accountId: string) {
//       return yield SnowflakeRepository.syncAccount(accountId)
//     }),
//   }))
//   .views((self) => ({
//     get Accounts() {
//       let availables = self.accounts.filter((o) => o.isDelete === 'N' && o.accountId !== 'NEXON')

//       if (self.searchType === 'account') {
//         availables = availables.filter(
//           (o) =>
//             o.accountId.includes(self.searchInputValue.toUpperCase()) || (o.accountName && o.accountName.includes(self.searchInputValue)),
//         )
//       }

//       if (self.searchTagValues.length && self.searchType === 'tag') {
//         availables = availables.filter(
//           (o) =>
//             o.tags &&
//             self.searchTagValues
//               .map((searchTag) => searchTag.trim().toUpperCase())
//               .every((searchTag) => o.tags && o.tags.some((tag) => tag.name.toUpperCase() === searchTag)),
//         )
//       }

//       if (!self.isAllView) {
//         availables = availables.filter((o) => self.myAccountList.includes(o.accountLocator || ''))
//       }

//       if (!AppConfig.IsProduction()) {
//         availables = availables.filter((o) => AppConfig.IsTestAccountNames(o.accountId))
//       }
//       switch (self.sortType) {
//         case 'name':
//           return availables.slice().sort((a, b) => {
//             return self.ascOrDesc === 'asc' ? a.accountId.localeCompare(b.accountId) : b.accountId.localeCompare(a.accountId)
//           })
//         case 'date':
//           return availables.slice().sort((a, b) => {
//             const dateA = new Date(a.createdOn)
//             const dateB = new Date(b.createdOn)

//             return self.ascOrDesc === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
//           })

//         default:
//           return availables
//       }
//     },

//     get headerLink() {
//       return self.selectedAccount ? `/monolake/account/${self.selectedAccount.accountId}` : '/monolake/account'
//     },
//     get header() {
//       return self.selectedAccount ? self.selectedAccount.accountId : 'Monolake'
//     },
//   }))
