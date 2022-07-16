import React from "react";
import { useEffect, useState } from "react";
//import "./navbar.scss";
import Link from "next/link";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
//import { AuthContext } from "../context/authContext/AuthContext";
//import { logout } from "../context/authContext/AuthActions";
import absoluteUrl from "next-absolute-url";

const NavBar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [url, setUrl] = useState([]);
  //  const { dispatch } = useContext(AuthContext);

  //Javascript split method href get the name of the path in array

  const scrollPage = () => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  };
  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  };
  typeof window !== "undefined" || scrollPage;

  useEffect(() => {
    const splitLocation = window.location.pathname.split("/");
    setUrl(splitLocation[1]);
    console.log(window.location.pathname.split("/"));
    console.log(window.location.href); // Logs `http://localhost:3000/blog/incididunt-ut-lobare-et-dolore`

    return;
  }, [router.pathname]);

  console.log(url);
  return (
    <header id="sp-header">
      <div className="container">
        <div className="row">
          <div id="sp-menu" className="col-sm-12 col-md-12">
            <div className="sp-column ">
              <div className="sp-megamenu-wrapper">
                <a id="offcanvas-toggler" href="#">
                  <i className="fa fa-bars"></i>
                </a>
                <ul className="sp-megamenu-parent menu-fade-up hidden-xs">
                  <li
                    className={
                      url[1] === "" ? "sp-menu-item active" : "sp-menu-item "
                    }
                  >
                    <Link href="/" onClick={refreshPage}>
                      <a>Home</a>
                    </Link>
                  </li>
                  <li
                    className={
                      url[1]?.indexOf("about") > 0
                        ? "sp-menu-item active"
                        : "sp-menu-item "
                    }
                  >
                    <Link href="/about">
                      <a>About us</a>
                    </Link>
                  </li>
                  <li
                    className={
                      url[1]?.indexOf("shipper") > 0
                        ? "sp-menu-item active"
                        : "sp-menu-item "
                    }
                  >
                    <Link href="/shipper">
                      <a>Shippers</a>
                    </Link>

                    {/* <div class="sp-dropdown sp-dropdown-main sp-menu-right">
                      <div class="sp-dropdown-inner">
                        <ul class="sp-dropdown-items">
                          <li class="sp-menu-item">
                          <Link href="/shipper" >
                            Shippers
                            </Link>
                          </li>
                          <li class="sp-menu-item">
                            <a href="blog-left-sidebar.html">
                              Blog With Left Sidebar
                            </a>
                          </li>
                          <li class="sp-menu-item">
                            <a href="blog-right-sidebar.html">
                              Blog With Right Sidebar
                            </a>
                          </li>
                          <li class="sp-menu-item">
                            <a href="single-blog.html">Single Blog v1</a>
                          </li>
                        </ul>
                      </div>
                    </div> */}
                  </li>
                  <li
                    className={
                      url[1]?.indexOf("carrier") > 0
                        ? "sp-menu-item active"
                        : "sp-menu-item "
                    }
                  >
                    <Link href="/carrier">
                      <a>Carriers</a>
                    </Link>
                  </li>

                  <li
                    className={
                      url[1]?.indexOf("contact") > 0
                        ? "sp-menu-item active"
                        : "sp-menu-item "
                    }
                  >
                    <Link href="/contact">
                      <a>Contact</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
// NavBar.getInitialProps = async (context) => {
//   const { req } = context;
//   console.log("context", context);
//   // Hostname is needed on both front and back so we should
//   // post it to the frontend by returning it from getInitialProps
//   const myApi = absoluteUrl(req).origin;
//   // typeof window !== "undefined"
//   //   ? window.location.host
//   //   : req.headers["x-forwarded-host"];

//   // We must instantiate an http client on both front and back.
//   // This allows us to prefetch on the server to reduce initial
//   // load latency. Tradeoff: added complexity, duplication because
//   // functions cannot cannot be passed through serialization.

//   //const { data } = await getGql(req, `{ comments { id text } }`);

//   // All of this will get json.stringified as part of next.js so you
//   // can't pass functions.
//   return {
//     // We pass any dependencies (args) needed to create a client

//     myApi,
//     // And also pass any initial (prefetched data) that is needed
//     // to server render the page, note that we don't need to pass
//     // anything that is lazily fetched on the page after server
//     // load. An example of things not to pass: anything that is
//     // below the fold or rendered conditionally after the initial
//     // page load.
//   };
// };
// NavBar.getInitialProps = async ({ req }) => {
//   let fullUrl;
//   if (req) {
//     // Server side rendering
//     fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
//   } else {
//     // Client side rendering
//     fullUrl =
//       window.location.protocol +
//       "//" +
//       window.location.hostname +
//       (window.location.port ? ":" + window.location.port : "");
//   }
//   return { fullUrl: fullUrl };
// };

// export async function getServerSideProps({ context }) {
//   // Get user id
//   const { req } = context;
//   const myApi = absoluteUrl(req).origin;
//   return {
//     props: { myApi }, // will be passed to the page component as props
//   };
// }

//export default NavBar;
export default dynamic(() => Promise.resolve(NavBar), { ssr: false });
