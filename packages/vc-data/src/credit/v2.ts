import { OneOrMore, CreateVCType, createSubjectContext, createContextConfig, createContext } from '../util/v2'
import { OrganizationV2, GovernmentOrgV2 } from '../base/v2'

// Helper Types

export type CreditOrganizationV2 = Omit<OrganizationV2, '@type'> & {
  '@type': 'CreditOrganization'
  name: string
  nationality?: GovernmentOrgV2
}

export type CreditScoreRangeV2 = {
  '@type': 'CreditScoreRange'
  name?: string
  identifier?: string
  scoreType?: string
  minimum?: number
  maximum?: number
}

export type NumericRangeV2 = {
  '@type': 'NumericRange'
  name?: string
  identifier?: string
  minimum?: number
  maximum?: number
}

export type MonetaryRangeV2 = {
  '@type': 'MonetaryRange'
  name?: string
  identifier?: string
  minimum?: number
  maximum?: number
  currency?: string
}

export type NumberOverTimePeriodV2 = {
  '@type': 'NumberOverTimePeriod'
  name?: string
  identifier?: string
  value?: number
  startDate?: string
  endDate?: string
}

const getHelperContextEntries = () => {
  const creditScoreRangeEntry = createSubjectContext<CreditScoreRangeV2>({
    type: 'CreditScoreRange',
    base: 'bloomSchema',
    properties: {
      name: 'schema',
      identifier: 'schema',
      scoreType: 'bloomSchema',
      minimum: 'schema',
      maximum: 'schema',
    },
  })

  const monetaryRangeEntry = createSubjectContext<MonetaryRangeV2>({
    type: 'MonetaryRange',
    base: 'bloomSchema',
    properties: {
      name: 'schema',
      identifier: 'schema',
      currency: 'schema',
      minimum: 'bloomSchema',
      maximum: 'bloomSchema',
    },
  })

  const numericRangeEntry = createSubjectContext<NumericRangeV2>({
    type: 'NumericRange',
    base: 'bloomSchema',
    properties: {
      name: 'schema',
      identifier: 'schema',
      minimum: 'bloomSchema',
      maximum: 'bloomSchema',
    },
  })

  const numberOverTimePeriodEntry = createSubjectContext<NumberOverTimePeriodV2>({
    type: 'NumberOverTimePeriod',
    base: 'bloomSchema',
    properties: {
      name: 'schema',
      identifier: 'schema',
      value: 'schema',
      startDate: 'schema',
      endDate: 'schema',
    },
  })

  return [creditScoreRangeEntry, monetaryRangeEntry, numericRangeEntry, numberOverTimePeriodEntry]
}

// Person Related

export type CreditPersonV2 = {
  '@type': 'CreditPerson'
  name?: string
  identifier?: string
  birthDate?: string
  givenName?: string
  additionalName?: OneOrMore<string>
  familyName?: string

  hasCreditScoreRange?: OneOrMore<CreditScoreRangeV2>
  hasRevolvingDebtRange?: OneOrMore<MonetaryRangeV2>
  hasRevolvingUtilizationRange?: OneOrMore<NumericRangeV2>
  hasTermDebtRange?: OneOrMore<MonetaryRangeV2>

  numInquiries?: NumberOverTimePeriodV2
  numLatePayments?: number | NumberOverTimePeriodV2
}

export type VCCreditPersonV2Type = 'CreditCredentialPersonV2'

export const getVCCreditPersonV2ContextConfig = () => {
  const accountPersonContext = createSubjectContext<CreditPersonV2>({
    type: 'CreditPerson',
    base: 'bloomSchema',
    properties: {
      name: 'schema',
      identifier: 'schema',
      birthDate: 'schema',
      givenName: 'schema',
      familyName: 'schema',
      additionalName: 'schema',
      hasCreditScoreRange: 'bloomSchema',
      hasRevolvingUtilizationRange: 'bloomSchema',
      hasRevolvingDebtRange: 'bloomSchema',
      hasTermDebtRange: 'bloomSchema',
      numInquiries: 'bloomSchema',
      numLatePayments: 'bloomSchema',
    },
  })

  return createContextConfig<VCCreditPersonV2Type>({
    type: 'CreditCredentialPersonV2',
    subjects: [accountPersonContext].concat(getHelperContextEntries()),
  })
}

// Export a pre-built VC type and context for easier use

export type VCCreditPersonV2 = CreateVCType<[VCCreditPersonV2Type], CreditPersonV2>

export const getVCCreditPersonV2Context = () => {
  return createContext(getVCCreditPersonV2ContextConfig())
}