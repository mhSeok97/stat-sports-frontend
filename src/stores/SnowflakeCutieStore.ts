// import {
//   CutieAccount,
//   CutieCategory,
//   CutieQuery,
//   type CutieQueryParameter,
//   CutieSubcategory,
//   type QueryResponse,
//   QueryResultTab,
// } from '@models/SnowflakeModels'
// import SnowflakeRepository from '@repositories/SnowflakeRepository'
// import { cast, clone, flow, type Instance, types } from 'mobx-state-tree'

// export const SnowflakeCutieStore = types
//   .model({
//     accounts: types.array(CutieAccount),
//     cutie: types.optional(types.array(CutieCategory), []),
//     subcategories: types.optional(types.array(CutieSubcategory), []),
//     queries: types.optional(types.array(CutieQuery), []),
//     parameterValues: types.optional(types.array(types.string), ['', '', '', '', '', '', '', '', '', '']),
//     selectedQuery: types.maybeNull(CutieQuery),
//     validationError: types.optional(types.maybeNull(types.string), null),
//     isAddPopupOpen: types.optional(types.boolean, false),
//     isEditPopupOpen: types.optional(types.boolean, false),
//     isLoading: types.optional(types.boolean, false),
//     openedCategoryIdList: types.optional(types.array(types.number), []),
//     openedSubcategoryIdList: types.optional(types.array(types.number), []),
//     maxParameterLength: types.optional(types.number, 10),
//     queryResultTabs: types.optional(types.array(QueryResultTab), [
//       {
//         id: 0,
//         name: '',
//         tasks: [],
//         status: false,
//       },
//       {
//         id: 1,
//         name: '',
//         tasks: [],
//         status: false,
//       },
//     ]),
//     selectedQueryID: types.maybeNull(types.optional(types.string, '')),
//   })

//   .actions((self) => ({
//     setCutie: flow(function* () {
//       self.cutie = yield SnowflakeRepository.getCategories(true, true)
//     }),
//     setCategory: flow(function* (categoryId: number) {
//       self.subcategories.clear()
//       const category = yield SnowflakeRepository.getCategoryById(categoryId, true, true)
//       category.subcategories.forEach((subcategory: Instance<typeof CutieSubcategory>) => {
//         self.subcategories.push(subcategory)
//       })
//       return category
//     }),
//     createCategory: flow(function* (name: string) {
//       yield SnowflakeRepository.createCategory(name)
//     }),
//     updateCategory: flow(function* (categoryId: number, name: string) {
//       yield SnowflakeRepository.updateCategory(categoryId, name)
//     }),
//     deleteCategory: flow(function* (categoryId: number) {
//       yield SnowflakeRepository.deleteCategory(categoryId)
//     }),
//     setSubcategory: flow(function* (subcategoryId: number) {
//       self.queries.clear()
//       const res = yield SnowflakeRepository.getSubcategoryById(subcategoryId)
//       res.queries.forEach((query: Instance<typeof CutieQuery>) => {
//         self.queries.push(query)
//       })
//       return res
//     }),
//     createSubcategory: flow(function* (categoryId: number, name: string) {
//       yield SnowflakeRepository.createSubcategory(name, 'Y', categoryId)
//     }),
//     updateSubcategory: flow(function* (categoryId: number, subcategoryId: number, name: string) {
//       yield SnowflakeRepository.updateSubcategory(subcategoryId, name, 'Y', categoryId)
//     }),
//     deleteSubcategory: flow(function* (subcategoryId: number) {
//       yield SnowflakeRepository.deleteSubcategory(subcategoryId)
//     }),
//     setQuery: flow(function* (queryId: number) {
//       const query = yield SnowflakeRepository.getQueryById(queryId)
//       self.selectedQuery = query
//       return query
//     }),
//     setSelectedQueryId: (id: string) => {
//       self.selectedQueryID = id
//     },
//     createQuery: flow(function* (subcategoryId: number, title: string, userEmail: string) {
//       return yield SnowflakeRepository.createQuery(subcategoryId, title, `USE MONOLAKE;\nSELECT 1;`, userEmail, '', 'Y')
//     }),
//     updateQuery: flow(function* (userEmail: string) {
//       if (self.selectedQuery) {
//         if (self.selectedQuery.queryText) {
//           const regex = /\${([^{}]+)}/g
//           const matches = new Set<string>()
//           let match
//           const parameters = new Set<string>()
//           const response: Instance<typeof CutieQuery> = yield SnowflakeRepository.getQueryById(self.selectedQuery.id)
//           if (response && response.queryParameters) {
//             self.selectedQuery.queryParameters = response.queryParameters
//             response.queryParameters.forEach((parameter: Instance<typeof CutieQueryParameter>) => {
//               parameters.add(parameter.parameterName)
//             })
//           }

//           while ((match = regex.exec(self.selectedQuery.queryText)) !== null) {
//             const variable = match[1].trim()
//             if (variable !== '') {
//               matches.add(variable)
//             }
//           }

//           let parameterLength = 0

//           if (self.selectedQuery.queryParameters) {
//             parameterLength = self.selectedQuery.queryParameters.length
//           }

//           Array.from(matches).map(async (parameterName: string) => {
//             if (
//               parameterName.match(/^[A-Za-z_]/) &&
//               parameterName.match(/^[A-Za-z0-9_$]*$/) &&
//               !parameters.has(parameterName) &&
//               self.selectedQuery &&
//               parameterLength < self.maxParameterLength
//             ) {
//               parameterLength += 1
//               return SnowflakeRepository.createQueryParameter(self.selectedQuery.id, parameterName, 'String')
//             }
//           })
//         }

//         yield SnowflakeRepository.updateQuery(
//           self.selectedQuery.id,
//           self.selectedQuery.title,
//           (self.selectedQuery.queryText && self.selectedQuery.queryText.replace(/\n+$/, '')) || '',
//           userEmail,
//           self.selectedQuery.description || '',
//           'Y',
//           self.selectedQuery.subCategoryId,
//         )
//       }
//     }),
//     deleteQuery: flow(function* (queryId: number) {
//       yield SnowflakeRepository.deleteQuery(queryId)
//     }),
//     createParameter: flow(function* (queryId: number, name: string) {
//       yield SnowflakeRepository.createQueryParameter(queryId, name, 'String')
//     }),
//     deleteQueryParameter: flow(function* (parameterId: number) {
//       yield SnowflakeRepository.deleteQueryParameter(parameterId)
//     }),
//     setValidationError: (error: string | null) => {
//       self.validationError = error
//     },
//     toggleAddPopup: (state: boolean) => {
//       self.isAddPopupOpen = state
//     },
//     toggleEditPopup: (state: boolean) => {
//       self.isEditPopupOpen = state
//     },
//     setLoading: (state: boolean) => {
//       self.isLoading = state
//     },
//     clearSubcategories: () => {
//       self.subcategories.clear()
//     },
//     clearQueries: () => {
//       self.queries.clear()
//     },
//     setSelectedQuery: (query: Instance<typeof CutieQuery>) => {
//       self.selectedQuery = query
//     },
//     clearSelectedQuery: () => {
//       self.selectedQuery = null
//     },
//     setSelectedQueryTitle: (title: string) => {
//       if (self.selectedQuery) {
//         self.selectedQuery.title = title
//       }
//     },
//     setSelectedQueryDescription: (description: string) => {
//       if (self.selectedQuery) {
//         self.selectedQuery.description = description
//       }
//     },
//     setSelectedQueryText: (queryText: string) => {
//       if (self.selectedQuery) {
//         self.selectedQuery.queryText = queryText
//       }
//     },
//     clearParameterValues: () => {
//       self.parameterValues.clear()
//       self.parameterValues.push('', '', '', '', '', '', '', '', '', '', '')
//     },
//     updateParameterValue: (index: number, value: string) => {
//       self.parameterValues[index] = value
//     },
//     addOpenedCategoryIdList: (categoryId: number) => {
//       self.openedCategoryIdList.push(categoryId)
//     },
//     deleteOpenedCategoryIdList: (categoryId: number) => {
//       const index = self.openedCategoryIdList.indexOf(categoryId)
//       if (index < 0) {
//         console.error('error')
//       } else {
//         self.openedCategoryIdList.splice(index, 1)
//       }
//     },
//     addOpenedSubcategoryIdList: (subcategoryId: number) => {
//       self.openedSubcategoryIdList.push(subcategoryId)
//     },
//     deleteOpenedSubcategoryIdList: (subcategoryId: number) => {
//       const index = self.openedSubcategoryIdList.indexOf(subcategoryId)
//       if (index < 0) {
//         console.error('error')
//       } else {
//         self.openedSubcategoryIdList.splice(index, 1)
//       }
//     },
//     createTab: () => {
//       let newNumber = 1
//       if (self.queryResultTabs.length > 2) {
//         const lastTabName = self.queryResultTabs[self.queryResultTabs.length - 1].name
//         const lastNumber = parseInt(lastTabName.split(' ')[1], 10)
//         newNumber = lastNumber + 1
//       }

//       const newName = `Result ${newNumber}`
//       const newId = newNumber + 1

//       const emptyTab: Instance<typeof QueryResultTab> = {
//         id: newId,
//         name: newName,
//         tasks: cast([]),
//         status: true,
//       }

//       self.queryResultTabs.push(emptyTab)
//       return emptyTab.id
//     },
//     deleteTab: (id: number) => {
//       const index = self.queryResultTabs.findIndex((tab) => tab.id === id)
//       if (index !== -1) {
//         self.queryResultTabs[index].status = false
//       }
//     },
//     closeTab: (tabId: number) => {
//       const index = self.queryResultTabs.findIndex((tab) => tab.id === tabId)
//       if (index !== -1) {
//         self.queryResultTabs.splice(index, 1)
//       }
//     },
//     addTaskToTab: (tabId: number, accountId: string) => {
//       const index = self.queryResultTabs.findIndex((tab) => tab.id === tabId)
//       if (index !== -1) {
//         self.queryResultTabs[index].tasks.push({ accountId: accountId, status: 'pending', response: [], errorMessage: '' })
//       }
//     },
//     updateTaskStatus: (tabId: number, accountId: string, status: string) => {
//       const index = self.queryResultTabs.findIndex((tab) => tab.id === tabId)
//       if (index !== -1) {
//         const accountIndex = self.queryResultTabs[index].tasks.findIndex((account) => account.accountId === accountId)
//         self.queryResultTabs[index].tasks[accountIndex].status = status
//       }
//     },
//     updateTaskErrorMessage: (tabId: number, accountId: string, errorMessage: string) => {
//       const index = self.queryResultTabs.findIndex((tab) => tab.id === tabId)
//       if (index !== -1) {
//         const accountIndex = self.queryResultTabs[index].tasks.findIndex((account) => account.accountId === accountId)

//         if (accountIndex !== -1) {
//           self.queryResultTabs[index].tasks[accountIndex].errorMessage = errorMessage
//         } else {
//           console.error('Account not found')
//         }
//       }
//     },
//     updateTaskResponse: (tabId: number, accountId: string, response: Instance<typeof QueryResponse>) => {
//       const index = self.queryResultTabs.findIndex((tab) => tab.id === tabId)
//       if (index !== -1) {
//         const accountIndex = self.queryResultTabs[index].tasks.findIndex((account) => account.accountId === accountId)
//         const clonedResponse = clone(response)
//         if (accountIndex !== -1) {
//           self.queryResultTabs[index].tasks[accountIndex].response.push(clonedResponse)
//         }
//       }
//     },
//   }))
//   .views((self) => ({
//     get getCutie() {
//       return self.cutie.filter((category) => category.state === 'Y').sort((a, b) => a.id - b.id)
//     },
//     get getCategory() {
//       return self.subcategories.filter((subcategory) => subcategory.state === 'Y')
//     },
//     get getSubcategory() {
//       return self.queries.filter((query) => query.state === 'Y')
//     },
//     get sortedQueryParameters() {
//       if (self.selectedQuery && self.selectedQuery.queryParameters) {
//         return self.selectedQuery.queryParameters.slice().sort((a, b) => a.parameterName.localeCompare(b.parameterName))
//       }
//       return null
//     },
//     get queryParameterLength() {
//       if (self.selectedQuery && self.selectedQuery.queryParameters) {
//         return self.selectedQuery.queryParameters.length
//       }
//       return 0
//     },
//   }))
