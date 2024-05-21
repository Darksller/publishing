import { RootState } from '@/app/store'

export const fromDbSelector = (state: RootState) => state.publication.fromDb
