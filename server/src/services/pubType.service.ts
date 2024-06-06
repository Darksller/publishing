import { getPubTypes } from '../repositories/pubType.repository'

export const getAllService = async () => {
	return await getPubTypes()
}
