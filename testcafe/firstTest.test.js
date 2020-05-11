import { Selector } from 'testcafe'

fixture `Getting Started`
  .page `http://localhost:3000/`


test('should visit main page', async t => {
  await t
    .expect(Selector('#root h1').innerText).eql('SPRINT BOARD:')
    .expect(Selector('table > tbody > tr').count).eql(3)
})

test('New Test', async t => {
  await t
    .click(Selector('button').withText('Clear table'))
    .expect(Selector('table > tbody > tr').count).eql(0)
})

test('New Test', async t => {
  await t
    .typeText(Selector('.controls > input'), 'jack')
    .expect(Selector('#main-table>tbody>tr:first-child>td:first-child').innerText).eql('JACK')
})
