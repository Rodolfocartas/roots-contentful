import test from 'ava'
import {
  helpers,
  mock_contentful,
  unmock_contentful,
  compile_fixture
} from './_helpers'

let ctx = {}

test.before(async t => {
  let title = 'Throw Some Ds'
  let body = 'Rich Boy selling crick'
  ctx = { ...ctx, title, body }
  mock_contentful({
    entries: [{
      fields: { title, body }
    }]
  })
  await ctx::compile_fixture('basic')
  ctx.index_path = `${ctx.public_dir}/index.html`
})

test('compiles basic project', t => {
  t.ok(helpers.file.exists(ctx.index_path))
})

test('has contentful data available in views', t => {
  t.true(helpers.file.contains(ctx.index_path, ctx.title))
  t.true(helpers.file.contains(ctx.index_path, ctx.body))
})

test.after(async t => {
  unmock_contentful()
})
