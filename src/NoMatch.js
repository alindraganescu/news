import React from 'react';

export default function NoMatch() {
  return (
    <div className="container-fluid d-flex align-items-center flex-column">
      <p className="display-5">No Matches</p>
      <iframe
        src="https://giphy.com/embed/l4FGEhHXgExT9UquA"
        width="480"
        height="356"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
      ></iframe>
      <p>
        <a href="/">Return to main</a>
      </p>
    </div>
  );
}
