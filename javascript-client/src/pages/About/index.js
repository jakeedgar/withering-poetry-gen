import React from 'react';
import NavBar from '../../components/NavBar';

const AboutPage = () => {
  return (
    <div>
      <NavBar />
      <div className="container-flex">
        <div className="row-flex">
          <div className="card">
            What is Erasure Poetry?
            <div className="card-body">
              Erasure is a form of found poetry or found object art created by erasing words from an existing text in prose or verse and framing the result on the page as a poem. The results can be
              allowed to stand in situ or they can be arranged into lines and/or stanzas.
            </div>
          </div>
          <div className="card">
            Why use AI to Generate this kind of poetry?
            <div className="card-body">
              Well, the truth is I failed to make an AI that generates poetry in any meaningful sense. However, I still think the project has merit, and I plan to continue to build it out over the
              coming months. Learning more about Natural Language processing, and Artificial Intelligence along the way.
            </div>
          </div>
          <div className="card">
            Who tf is Jake Edgar?
            <div className="card-body">
              Jake is a former Chef turned coder. He writes fiction, poetry, and non-fiction, and this project was a natural extension of his obsession with words.
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
