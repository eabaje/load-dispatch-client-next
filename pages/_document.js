//import { ServerStyleSheets } from "@material-ui/core/styles";
import Document, { Html, Head, Main, NextScript } from "next/document";

import React from "react";
export default class MyDocument extends Document {
  render() {
    return (
      <>
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="description" content="" />
            <meta name="keywords" content="" />
            <meta name="author" content="Phoenixcoded" />

            {/*Favicon icon */}
            <link
              rel="icon"
              href="/assets/images/favicon.ico"
              type="image/x-icon"
            />
            <link rel="stylesheet" href="/css/bootstrap.css" type="text/css" />

            <link
              rel="stylesheet"
              href="/css/font-awesome.min.css"
              type="text/css"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />

            <link rel="stylesheet" href="css/icon-font.css" type="text/css" />
            <link
              rel="stylesheet"
              type="text/css"
              href="/css/animate.min.css"
            />

            <link rel="stylesheet" href="/css/settings.css" type="text/css" />
            <link
              rel="stylesheet"
              href="/css/dynamic-captions.css"
              type="text/css"
            />
            <link
              rel="stylesheet"
              href="/css/static-captions.css"
              type="text/css"
            />

            <link
              rel="stylesheet"
              href="/css/owl.carousel.css"
              type="text/css"
            />
            <link rel="stylesheet" href="/css/owl.theme.css" type="text/css" />
            <link
              rel="stylesheet"
              href="/css/owl.transitions.css"
              type="text/css"
            />
            <link
              rel="stylesheet"
              href="/css/sp-flickr-gallery.css"
              type="text/css"
            />
            <link
              rel="stylesheet"
              href="/css/odometer-theme-minimal.css"
              type="text/css"
            />
            <link rel="stylesheet" type="text/css" href="/css/style.css" />
            <script src="/js/jQuery.js" type="text/javascript"></script>
          </Head>
          <body>
            <Main />
            <NextScript />

            {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> */}
            <script src="/js/bootstrap.js" type="text/javascript"></script>
            <script type="text/javascript" src="/js/appear.js"></script>
            <script
              type="text/javascript"
              src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB0YyDTa0qqOjIerob2VTIwo_XVMhrruxo"
            ></script>
            <script
              src="/js/jquery.themepunch.tools.min.js"
              type="text/javascript"
            ></script>
            <script
              src="/js/jquery.themepunch.revolution.min.js"
              type="text/javascript"
            ></script>
            <script
              src="/js/jquery.parallax-1.1.3.js"
              type="text/javascript"
            ></script>
            <script src="/js/smoothscroll.js" type="text/javascript"></script>
            <script src="/js/owl.carousel.js" type="text/javascript"></script>
            <script
              src="/js/sp-flickr-gallery.js"
              type="text/javascript"
            ></script>
            <script src="/js/odometer.min.js" type="text/javascript"></script>

            <script src="/js/main.js" type="text/javascript"></script>
          </body>
        </Html>
      </>
    );
  }
}
// MyDocument.getInitialProps = async (ctx) => {
//   const sheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;
//   ctx.renderPage = () => {
//     return originalRenderPage({
//       enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//     });
//   };
//   const initialProps = await Document.getInitialProps(ctx);
//   return {
//     ...initialProps,
//     styles: [
//       ...React.Children.toArray(initialProps.styles),
//       sheets.getStyleElement(),
//     ],
//   };
// };
