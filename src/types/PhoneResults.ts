import { Phone } from '../types/Phone'
import { PhoneDetails } from './PhoneDetails'


export interface PhoneResults {
  phone: PhoneDetails,
  id: string,
  similar: Phone[],
}
