import should from 'should';
import sinon from 'sinon';
import plugins, {when, file, format} from '../src';

const stubPlugin = {
  name: 'StubPlugin',
  outputOptions: sinon.stub(),
  generateBundle: sinon.stub(),
  renderChunk: sinon.stub()
};

const notSupportPlugin = {
  name: 'not-support',
  renderStart: sinon.stub()
};

afterEach(function() {
  sinon.restore();
});

describe('rollup-plugin-by-output', function() {
  describe('filter helps', function() {
    it('should work with regexp', function() {
      const filter = file(/abc/);
      filter({file: '123abcd'}).should.be.true();
      filter({file: '123a bcd'}).should.be.false();
    });

    it('should work with string', function() {
      const filter = format('abc');
      filter({format: 'abc'}).should.be.true();
      filter({format: 'abcd'}).should.be.false();
    });

    it('should work with function', function() {
      const filter = file(f => f);
      filter({file: 'abc'}).should.be.ok();
      filter({file: ''}).should.not.be.ok();
    });
  });

  describe('plugin wrapper', function() {
    it('[when] should be work', function() {
      const wrappedPlugin = when(o => o.file === 'f', stubPlugin);
      wrappedPlugin.should.not.equal(stubPlugin);

      should(wrappedPlugin.outputOptions({})).be.null();
      stubPlugin.outputOptions.should.not.be.called();
      wrappedPlugin.outputOptions({file: 'f'});
      stubPlugin.outputOptions.should.be.called();

      should(wrappedPlugin.generateBundle({})).be.undefined();
      stubPlugin.generateBundle.should.not.be.called();
      wrappedPlugin.generateBundle({file: 'f'});
      stubPlugin.generateBundle.should.be.called();

      should(wrappedPlugin.renderChunk(null, null, {})).be.null();
      stubPlugin.renderChunk.should.not.be.called();
      wrappedPlugin.renderChunk(null, null, {file: 'f'});
      stubPlugin.renderChunk.should.be.called();
    });

    it('[when] should throw with not support hook', function() {
      should(() => {
        when(o => o.file, notSupportPlugin);
      }).throw(/not support/);
    });

    it('[plugins] work with multi plugins', function() {
      const filter = o => o.file;
      const newPlugins = plugins(
        [filter, stubPlugin],
        [filter, [stubPlugin, stubPlugin]],
        notSupportPlugin
      );

      newPlugins.length.should.be.equal(4);
      newPlugins.should.not.containEql(stubPlugin);
      newPlugins[3].should.be.equal(notSupportPlugin);
    });
  });
});
