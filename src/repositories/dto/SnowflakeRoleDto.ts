export interface SnowflakeRoleDto {
  name: string
  isDefault: string
  isCurrent: string
  isInherited: string
  assignedToUsers: number
  grantedToRoles: number
  grantedRoles: number
  owner: string
  comment: string
  createdOn: string
}
