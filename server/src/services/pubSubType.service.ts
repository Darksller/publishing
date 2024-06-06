import { getPubSubTypes } from '../repositories/pubSubType.repository'

export const getAllService = async () => {
	return await getPubSubTypes()
}
