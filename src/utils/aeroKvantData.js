const kvantData = [
  {
    id: 'sk',
    coords: [55.692099, 37.347323],
    name: 'Сколково - Москва',
    adress: 'г. Москва, ул. Большой бульвар, 42с1',
    phone: '+7 (495) 587-75-57',
    site: 'roskvantorium.ru'
  },
  {
    id: 'yakutsk',
    coords: [62.031077, 129.724345],
    name: 'Якутск',
    adress: 'Республика Саха (Якутия), г. Якутск, ул. Кирова, 20',
    phone: '+7 (411) 242-81-30',
    site: 'http://ddt.yaguo.ru/category/kvantorium/'
  },
  {
    id: 'ufa',
    coords: [54.741410, 56.026918],
    name: 'Уфа',
    adress: 'Республика Башкортостан, г. Уфа, ул. Менделеева, 205а',
    phone: '+7 (347) 285-00-01',
    site: 'https://gagarin.center/cuantorium/'
  },
  {
    id: 'nab_chelny',
    coords: [55.738454, 52.450060],
    name: 'Набережные челны',
    adress: 'Республика Татарстан, г. Набережные Челны, ул. Машиностроительная, 91',
    phone: '+7 (855) 240-91-80',
    site: 'http://kvantorium.ru/'
  },
  {
    id: 'krasnoyarsk',
    coords: [56.009220, 92.888549],
    name: 'Красноярск',
    adress: 'Красноярский край, г. Красноярск, ул. Дубровинского, 1и',
    phone: '+7 (391) 257-37-97',
    site: 'https://kvantorium24.ru/'
  },
  {
    id: 'kna',
    coords: [50.539019, 137.027432],
    name: 'Комсомольск-на-Амуре',
    adress: 'Хабаровский край, г. Комсомольск-на-Амуре, ул. Пионерская, 15',
    phone: '+7 (421) 759-07-16',
    site: 'http://kvantorium-kms.ru/'
  },
  {
    id: 'kaluga',
    coords: [54.498795, 36.278193],
    name: 'Калуга',
    adress: 'Калужская область, г. Калуга, ул. Салтыкова-Щедрина, 66',
    phone: '+7 (484) 279-74-90',
    site: 'http://kvantoriumkaluga.ru/'
  },
  {
    id: 'omsk',
    coords: [54.972499, 73.464799],
    name: 'Омск',
    adress: 'Омская область, г. Омск, улица Петра Осминина, 34',
    phone: '+7 (381) 295-73-53',
    site: 'http://kvantorium55.ru/'
  },
  {
    id: 'perm',
    coords: [58.003927, 56.260534],
    name: 'Пермь',
    adress: 'Пермский край, г. Пермь, ул. 25 Октября, 64',
    phone: '+7 (342) 214-42-69',
    site: 'https://kvantorium-perm.ru/'
  },
  {
    id: 'samara',
    coords: [53.207831, 50.159195],
    name: 'Самара',
    adress: 'Самарская область, г. Самара, проспект Масленникова, 37',
    phone: '+7 (846) 334-20-15',
    site: 'http://кванториум63.рф'
  },
  {
    id: 'tomsk',
    coords: [56.461944, 84.950425],
    name: 'Томск',
    adress: 'Томская область, г. Томск, пр. Ленина, 26',
    phone: '+7 (382) 260-98-53',
    site: 'http://kvantoriumtomsk.ru/'
  },
  {
    id: 'khanty-mansiysk',
    coords: [61.016645, 69.052840],
    name: 'Ханты-Мансийск',
    adress: 'Ханты-Мансийский автономный округ - Югра, г. Ханты-Мансийск, ул. Студенческая, 29',
    phone: '+7 (346) 737-00-26',
    site: 'http://kvant86.ru/'
  },
  {
    id: 'neftygansk',
    coords: [61.097732, 72.617975],
    name: 'Нефтеюганск',
    adress: 'Ханты-Мансийский автономный округ - Югра, г. Нефтеюганск, ул. Ленина, 18',
    phone: '+7 (346) 351-14-30',
    site: 'http://kvant86.ru/'
  },
  {
    id: 'raduzhnyi',
    coords: [62.148279, 77.332639],
    name: 'Радужный',
    adress: 'Ханты-Мансийский автономный округ - Югра, г. Радужный, Аэропорт города Радужный',
    phone: '+7 (922) 359-92-30',
    site: 'http://kvant86.ru/'
  },
  {
    id: 'krasnogorsk',
    coords: [55.813337, 37.339073],
    name: 'Красногорск',
    adress: 'Московская область, г. Красногорск, ул. Вокзальная, 17А',
    phone: '+7 (495) 592-04-21',
    site: 'https://kvantorium-krascrtd.edumsko.ru/'
  },
  {
    id: 'evpatoria',
    coords: [45.188240, 33.339966],
    name: 'Евпатория',
    adress: 'Республика Крым, г. Евпатория, ул. Полупанова, 17',
    phone: '+7 (3652) 27-32-13',
    site: 'https://ekvantorium82.ru/'
  },
  {
    id: 'sebastopol',
    coords: [44.609148, 33.548378],
    name: 'Севастополь',
    adress: 'Севастополь, ул. Папанина, 5/7',
    phone: '+7 (978) 907 31 31',
    site: 'http://kv92.ru/'
  },
  {
    id: 'khabarovsk',
    coords: [48.428464, 135.107041],
    name: 'Хабаровск',
    adress: 'Хабаровский край, г.Хабаровск, ул. П.Л. Морозова, 92Б',
    phone: ' +7 (4212) 47-36-27',
    site: 'http://kvantorium.kco27.ru/'
  },
  {
    id: 'kostroma',
    coords: [57.757481, 40.985186],
    name: 'Кострома',
    adress: 'Костромская область, г. Кострома, ул. Локомотивная, д.2',
    phone: '+7 (920) 395-19-38',
    site: 'https://www.kvantorium44.ru/'
  },
  {
    id: 'ivanovo',
    coords: [57.023886, 40.966671],
    name: 'Иваново',
    adress: 'Ивановская область, г. Иваново, Проспект Ленина, 73',
    phone: '+7 (4932) 93 84 60',
    site: 'http://kvantorium37.ru/'
  },
  {
    id: 'vladimir',
    coords: [56.141763, 40.417567],
    name: 'Владимир',
    adress: 'Владимирская область, г. Владимир, ул. Каманина, 30/18',
    phone: '+7 (4922) 52-08-67',
    site: 'http://kvantorium33.ru/'
  },
  {
    id: 'ryzan',
    coords: [54.627642, 39.715660],
    name: 'Рязань',
    adress: 'Рязанская область, г. Рязань, ул. Дзержинского, 6',
    phone: '+7 (4912) 55-92-80',
    site: 'https://кванториум62.рф/'
  },
  {
    id: 'pskov',
    coords: [57.811949, 28.357658],
    name: 'Псков',
    adress: 'Псковская область, г. Псков, Иркутский пер. 2',
    phone: '+7 (8112) 79-70-79',
    site: 'http://kvantoriumpskov.ru/'
  },
  {
    id: 'orenburg',
    coords: [51.811312, 55.147692],
    name: 'Оренбург',
    adress: 'Оренбургская область, г. Оренбург, проезд Автоматики, 8',
    phone: '+7 (3532) 43-09-52',
    site: 'https://kvantorium56.ru/'
  },
  {
    id: 'kirov',
    coords: [54.078785, 34.309445],
    name: 'Киров',
    adress: 'Кировская область, г. Киров, ул. Пролетарская, 50',
    phone: '+7 (8332) 45-57-15',
    site: 'https://kvant43.ru/'
  },
  {
    id: 'chita',
    coords: [52.042931, 113.500501],
    name: 'Чита',
    adress: 'Забайкальский край, г. Чита, ул. Балябина, 44',
    phone: '+7 (302) 221-77-65',
    site: 'https://nataliyavedenskaya.wixsite.com/kvantoriumchita'
  },
  {
    id: 'ekb',
    coords: [56.844894, 60.591429],
    name: 'Екатеринбург',
    adress: 'Свердловская область, г. Екатеринбург, ул. Бориса Ельцина 3',
    phone: '+7 (343) 363-04-85',
    site: 'https://kvant.dm-centre.ru/'
  },
  {
    id: 'shadrinsk',
    coords: [56.080537, 63.623072],
    name: 'Шадринск',
    adress: 'Курганская область, г. Шадринск, улица Карла Либкнехта, 3',
    phone: 'н.д.',
    site: 'https://vk.com/kvantorium_shadrinsk'
  },
  {
    id: 'balashiha',
    coords: [55.741064, 38.005070],
    name: 'Балашиха',
    adress: 'Московская область, г. Балашиха, ул. Андрея Белого (Железнодорожный Мкр.), дом 6а',
    phone: '+7 (967) 194-51-10',
    site: 'https://obrlab.ru/kvantorium/'
  },
  {
    id: 'bor',
    coords: [56.402476, 43.991757],
    name: 'Бор',
    adress: 'Нижегородская область, городской округ город Бор, пос. Неклюдово, ул. Трудовая, д. 10А',
    phone: 'н.д.',
    site: 'https://kvantorium52.ru/kvantorium/bor'
  },
  {
    id: 'tymen',
    coords: [57.133642, 65.569793],
    name: 'Тюмень',
    adress: 'Тюменская область, г. Тюмень, проезд Геологоразведчиков, 6а',
    phone: '+7 (3452) 29-03-31',
    site: 'https://kvantorium-tyumen.ru/'
  },
  {
    id: 'vladikavkaz',
    coords: [43.054887, 44.672132],
    name: 'Владикавказ',
    adress: 'Респ. Северная Осетия, г. Владикавказ, ул. Минина, 15',
    phone: '+7 (918) 832-42-56',
    site: 'https://kvantorium15.ru/'
  },
  {
    id: 'achinsk',
    coords: [56.269231, 90.495833],
    name: 'Ачинск',
    adress: 'Красноярский край, г. Ачинск, ул. Свердлова, 17',
    phone: '+7 (39151) 6-02-22',
    site: 'https://kvantorium-achinsk.ru/'
  },
  {
    id: 'syktyvkar',
    coords: [61.666867, 50.836821],
    name: 'Сыктывкар',
    adress: 'Респ. Коми, г. Сыктывкар ул. Ленина, д. 74',
    phone: '+7 (8212) 402−368',
    site: 'https://kvantorium11.ru/'
  },
  {
    id: 'voronezh',
    coords: [51.641485, 39.234378],
    name: 'Воронеж',
    adress: 'Воронежская область, г. Воронеж, ул. Щорса, д. 164',
    phone: '+7 (473) 249-57-04',
    site: 'http://kvantoriumvrn.ru/'
  },
  {
    id: 'volzhskiy',
    coords: [48.786928, 44.772160],
    name: 'Волжский',
    adress: 'Волгоградская область, г. Волжский, ул. Машиностроителей, 15',
    phone: '+7 (902) 383-50-24',
    site: 'https://www.kvantoriumvlz.com/'
  },
  {
    id: 'rossosh',
    coords: [50.194750, 39.572576],
    name: 'Россошь',
    adress: 'Воронежская область, г. Россошь ул. Пролетарская, 113',
    phone: '+7 (47396) 2-59-10',
    site: 'http://кванториумроссошь.рф/'
  },
  {
    id: 'kirovsk',
    coords: [59.880744, 30.999235],
    name: 'Кировск',
    adress: 'Ленинградская обл., г. Кировск, ул. Новая д. 40',
    phone: '+7 (965) 044-40-18',
    site: 'https://www.kvantorium47.ru/'
  },
  {
    id: 'astrakhan',
    coords: [46.340839, 48.030044],
    name: 'Астрахань',
    adress: 'Астраханская область, г. Астрахань, ул. Бакинская, 79',
    phone: '+7 (8512) 44-24-28',
    site: 'https://школьныйтехнопарк.рф/direction/engineer/'
  }
]

export default kvantData