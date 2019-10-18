const React = require('react');
const Viewer = require('./dist/index');

function App () {
  const [ visible, setVisible ] = React.useState(false);

  const images = [
    {
      src:
        "https://infeng.github.io/react-viewer/59111ff2c38954887bc313887fe76e27.jpg"
    },
    {
      src:
        "https://infeng.github.io/react-viewer/bbbc41dac417d9fb4b275223a6a6d3e8.jpg"
    }
  ];

  return (
    <div>
      <button onClick={() => { setVisible(true); }}>{visible ? 'close' : 'open'}</button>
      <Viewer images={images} visible={visible} />
    </div>
  );
}

module.exports = App;
