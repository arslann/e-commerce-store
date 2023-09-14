import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <div className="navbar navbar-center bg-black">
      <div className="container mx-auto">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Home
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
