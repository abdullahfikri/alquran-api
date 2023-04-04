
# Al-Qur'an API Muhammad Fikri

This API data source is derived from the combination of several parameters and processes behind the scenes sourced from https://quran.api-docs.io and https://quran.kemenag.go.id.





## Features

- List of Juz and Chapter
- Get Surah/verse depend on id Juz, id chapter, and id verse
- Get word of verse depend on id Juz, id chapter
- Provide unicode for each verse or word of verse
- Get tafsir, languages, reciters, translations of verse from Al-Qur'an.


## How to Use

To use this API, you need to combine the API server URL with the endpoint.

API server URL = https://api.mfikridev.xyz/

Example Usage:
https://api.mfikridev.xyz/juzs


## Endpoint Usage

### Tafsir
#### Get all list tafsir info

```http
  GET /tafsirs
```

### Languages
#### Get all list Languages info

```http
  GET /languages
```


### Juz
#### Get all list juz

```http
  GET /juzs
```

### Chapters
#### Get all Chapter info

```http
  GET /chapters
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `language`      | `string` | **Optional**. ISO Code of language to fetch the translate of chapter |
| `recitation`      | `string` | **Optional**. Id of recitation to fetch the audio of all verse in a chapter |

Example with parameters
```http
  GET /chapters?language=id&recitation=7
```


#### Get a Chapter info

```http
  GET /chapters/{id_chapter}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `language`      | `string` | **Optional**. ISO Code of language to fetch the translate of chapter |
| `recitation`      | `string` | **Optional**. Id of recitation to fetch the audio of all verse in a chapter |

Example with parameters
```http
  GET /chapters/1?language=en&recitation=7
```

### Reciters
#### Get all of Reciters info

```http
  GET /recitations
```
#### Get a of Audio of verse
```http
  GET /recitations/{id_reciter}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `chapter_number`      | `number` | **Choose one**. Parameters to select audio depend on number of chapter |
| `juz_number`      | `string` | **Choose one**. Parameters to select audio depend on number of juz |
| `page`      | `number` | **Optional**. Limit the retrieval of data using pagination |
| `per_page`      | `number` | **Optional**. The number of data to retreive, default is 10 |

Example with parameters
```http
  GET /recitations/1?chapter_number=2&page=1&per_page=10
```

**Note: You must choose one between chapter_number or juz_number.*

### Translations
#### Get all of Translations info

```http
  GET /translations
```

#### Get all of Translations of Verse

```http
  GET /translations
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `chapter_number`      | `number` | **Choose One**. Parameters to select translation depend on number of chapter |
| `juz_number`      | `string` | **Choose One**. Parameters to select translation depend on number of juz |
| `page`      | `number` | **Optional**. Limit the retrieval of data using pagination |
| `per_page`      | `number` | **Optional**. The number of data to retreive, default is 10 |

Example with parameters
```http
  GET /translations/17?juz_number=1&page=1&per_page=10
```

**Note: You must choose one between chapter_number or juz_number.**



### Word of Verse
#### Get Word of verse by Chapter

```http
  GET /words/by_chapter/{id_chapter}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `language`      | `number` | **Optional**. Id of language to include fetch the translations |
| `unicode`      | `boolean` | **Optional**. Parameters to select include unicode of word verse depend on true or false |
| `page`      | `number` | **Optional**. Limit the retrieval of data using pagination |
| `per_page`      | `number` | **Optional**. The number of data to retreive, default is 10 |

Example with parameters
```http
  GET /words/by_chapter/2?language=2&unicode=true&page=1&per_page=10
```

#### Get Word of verse by Juz

```http
  GET /words/by_juz/{id_juz}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `language`      | `number` | **Optional**. Id of language to include fetch the translations |
| `unicode`      | `boolean` | **Optional**. Parameters to select include unicode of word verse depend on true or false |
| `page`      | `number` | **Optional**. Limit the retrieval of data using pagination |
| `per_page`      | `number` | **Optional**. The number of data to retreive, default is 10 |

Example with parameters
```http
  GET /words/by_juz/1?language=2&unicode=true&page=1&per_page=10
```

### Verse
Note: parameter in below, apply for all verse Endpoint

#### By Chapter
**Get verse by id chapter**

```http
  GET /verses/by_chapter/{id_chapter}
```
**Get verse uthmani text by id verse**

```http
  GET /verses/uthmani/by_chapter/{id_chapter}
```
**Get verse imlaei text by id verse**

```http
  GET /verses/imlaei/by_chapter/{id_chapter}
```
**Get verse indopak text by id verse**

```http
  GET /verses/indopak/by_chapter/{id_chapter}
```

#### By Juz
**Get verse by id juz**

```http
  GET /verses/by_juz/{id_juz}
```
**Get verse uthmani text by id verse**

```http
  GET /verses/uthmani/by_juz/{id_juz}
```
**Get verse imlaei text by id verse**

```http
  GET /verses/imlaei/by_juz/{id_juz}
```
**Get verse indopak text by id verse**

```http
  GET /verses/indopak/by_juz/{id_juz}
```


#### GET Single Verse
**Get a verse by id verse**

```http
  GET /verses/{id_verse}
```
**Get a verse uthmani text by id verse**

```http
  GET /verses/uthmani/{id_verse}
```
**Get a verse imlaei text by id verse**

```http
  GET /verses/imlaei/{id_verse}
```
**Get a verse indopak text by id verse**

```http
  GET /verses/indopak/{id_verse}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `translation`      | `number` | **Optional**. Id of translation to include fetch the translations |
| `unicode`      | `boolean` | **Optional**. Parameters to select include unicode or not for word verse depend on true or false |
| `recitation`      | `number` | **Optional**. ID of recitation to select audio |
| `tafsir`      | `number` | **Optional**. Id of tafsir to  include tafsir or not for word verse |
| `words`      | `boolean` | **Optional**. Parameters to select include words or not for word verse depend on true or false |
| `language`      | `number` | **Optional**. Id of language to select translate of words verse |
| `page`      | `number` | **Optional**. Limit the retrieval of data using pagination |
| `per_page`      | `number` | **Optional**. The number of data to retreive, default is 10 |


## API Authors

- [Muhammad Fikri](https://www.github.com)


## DATABASE Authors

- [Aji Bayu Permadi](https://www.github.com)
- [Elvino Dwi Saputra](https://www.github.com)
- [Febrian Rizky Adi Sutiyo](https://www.github.com)
- [Lutfi Aldri Permana](https://www.github.com)
- [Muhammad Fikri](https://www.github.com)

