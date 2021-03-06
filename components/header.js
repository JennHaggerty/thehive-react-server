import React from 'react';
import {Link, getCurrentRequestContext} from "react-server";

//import SvgClose from './assets/SvgClose';
//import SvgHambut from './assets/SvgHambut';

//import './Header.less';
const About = () => <Link path="/about">About</Link>
const links = [
	//{
	//	label: "About",
	//	path: "/about",
	//	internal: true,
	//},
	{
		label: "Blog",
		path: "/blog",
		internal: true,
  },
  {
		label: "Contact",
		path: "/contact",
		internal: true,
  },
  {
		label: "Resume",
		path: "/resume",
		internal: true,
	},
	{
		label: "GitHub",
		path: "https://github.com/jennhaggerty",
		internal: false,
	},
]

const currentPath = () => getCurrentRequestContext().getCurrentPath();
const classIfActive = (path, internal) => (path.split("/")[1] === currentPath().split("/")[1]) && internal ? {className:"active"}:{}

const HeaderLink = ({label, path, internal}) => {
	// Internal links use Client Transitions for faster load times.
	if (internal) {
		return <li key={path} {...classIfActive(path, internal)}><Link path={path} bundleData>{label}</Link></li>
	} else {
		return <li key={path} {...classIfActive(path, internal)}><a target="_blank" href={path}>{label}</a></li>
	}
}



export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuOpen: false,
		};
	}

	componentDidMount() {
		// Because Client Transitions will reload the content, not the page, we
		// make sure that a navigation action also closes the modal.
		// If we didn't do this, you'd wind up on a new page but still have the
		// menu open.
		getCurrentRequestContext().navigator.on( "navigateStart", this.closeMenu.bind(this) );
	}

	render () {
		return (
			<div>
				<div className="fixedHeaderSpacer"></div>
				<header className={this.state.menuOpen ? "menuOpen Header" : "Header"}>
					<Link className="header-logo" path="/">
						Jennifer Haggerty
					</Link>

					<nav className="header-nav" ref="headerNav">
						<ul>
							{links.map(HeaderLink)}
						</ul>
					</nav>
				</header>
			</div>
		);
	}

	closeMenu() {
		this.setState( {menuOpen: false} );
	}

	toggleMenuOpen() {
		// For mobile devices, the menu is basically a modal - it takes over the
		// whole viewport. To prevent the user from scrolling the page behind
		// the navigation menu, we prevent touchmove from firing.
		if (!this.state.menuOpen) {
			this.refs.headerNav.addEventListener('touchmove', function(event) {
				event.preventDefault();
				event.stopPropagation();
			}, false);
		}

		this.setState( {menuOpen: !this.state.menuOpen} );
	}
}