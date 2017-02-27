import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line

const BUILD_TIME = new Date().getTime();

export default function HTML(props) {
  const { body } = props;
  const { title, meta } = Helmet.rewind();

  let path = '';
  if (props.location && props.location.pathname) {
    path = props.location.pathname;
  }

  let css;
  if (process.env.NODE_ENV === 'production') {
    css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />; // eslint-disable-line
  }

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        { title.toComponent() }

        <meta name='robots' content='index, follow' />
        <meta name='author' content='Prayash Thapa' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:creator' content='@iameffulgence' />

        <meta property='fb:app_id' content='532441146961582' />
        <meta property='og:url' content={`http://effulgence.io${path}`} />
        <meta property='og:site_name' content='effulgence // prayash thapa' />

        { meta.toComponent() }

        <script src="https://use.fontawesome.com/8d22a2b20b.js"></script>
        { css }
      </head>
      <body id='container'>
        <div id='react-mount' dangerouslySetInnerHTML={{ __html: body }} />
        <script async src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
        <script
          async
          dangerouslySetInnerHTML={{
            __html: '(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,\'script\',\'https://www.google-analytics.com/analytics.js\',\'ga\'); ga(\'create\', \'UA-59088313-1\', \'auto\'); ga(\'send\', \'pageview\');'
          }}
        />
      </body>
    </html>
  );
}

HTML.propTypes = {
  body: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};
