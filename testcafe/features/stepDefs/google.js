import { Given, When, Then } from 'cucumber'
import { Selector as NativeSelector } from 'testcafe'

const Selector = (input, t) => {
  return NativeSelector(input).with({ boundTestRun: t })
}

Given('Я открываю страницу Google', async t => {
  await t.navigateTo('https://www.google.com')
})

When('Я пишу в строку поиска {string} в Google', async(t, [ searchRequest ]) => {
  const input = Selector('[name="q"]', t)

  await t.typeText(input, searchRequest)
})

Then('Я нажимаю клавишу {string} в Google', async(t, [ key ]) => {
  await t.pressKey(key)
})

Then('Я должен увидеть, что первый результат Google {string}', async(t, [ expectedSearchResult ]) => {
  const firstLink = Selector('#rso', t).find('a')

  await t.expect(firstLink.innerText).contains(expectedSearchResult)
})
