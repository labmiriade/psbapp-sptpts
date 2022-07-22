import { components } from './schema';
import * as faker from 'faker';

export function PlaceList(): components['schemas']['PlaceList'] {
  const places = [];

  for (let i = 0; i < 50; i++) {
    places.push(PlaceInfo());
  }

  return {
    places,
  };
}

export function PlaceInfo(placeId?: string): components['schemas']['PlaceInfo'] {
  return {
    placeId: placeId ?? faker.random.word(),
    category: faker.random.word(),
    streetName: faker.address.streetAddress(),
    streetNumber: faker.datatype.number().toString(),
    name: faker.company.companyName(),
    city: faker.address.city(),
    province: faker.address.county(),
    lat: faker.address.latitude(),
    lon: faker.address.longitude(),
    description: faker.random.words(20),
    website: `https://wwww.${faker.internet.domainName()}.com`,
    activity: faker.random.word(),
    istatCode: `${faker.datatype.string(1)}${faker.datatype.number(999)}`,
    accessType: faker.random.word(),
    contact: faker.random.word(),
    email: faker.name.firstName() + '@gmail.com',
  };
}

export function CategoriesList(): components['schemas']['CategoriesList'] {
  return {
    categories: [
      'Esposizioni Permanenti',
      'Percorsi e proposte didattiche',
      'Territorio',
      'Esposizioni Permanenti',
      'Percorsi e proposte didattiche',
      'Territorio',
      'Esposizioni Permanenti',
      'Percorsi e proposte didattiche',
      'Territorio',
      'Esposizioni Permanenti',
      'Percorsi e proposte didattiche',
      'Territorio',
      'Esposizioni Permanenti',
      'Percorsi e proposte didattiche',
      'Territorio',
    ],
  };
}
