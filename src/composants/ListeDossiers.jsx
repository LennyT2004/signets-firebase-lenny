import Dossier from './Dossier';

// Importer le composant motion
import { motion } from 'framer-motion';

import './ListeDossiers.scss';
import { supprimer } from '../code/dossier-modele';

export default function ListeDossiers({dossiers, setDossiers, idUtil}) {
  
  function supprimerDossier(idDossier) {
    // Supprimer sur Firestore
    supprimer(idUtil, idDossier);

    // Supprimer localement
    setDossiers(dossiers.filter(elt => elt.id != idDossier))
  }

  function modifierDossier(id, titre, couverture, couleur, dateModif) {
    // Modifier sur Firestore

    // Modifier localement
    setDossiers(dossiers.map(
      doss => {
        if(doss.id == id) {
          return ({id, titre, couverture, couleur, dateModif});
        }
        return doss;
      }
    ));
  }

  return (
    <ul className="ListeDossiers">
      {
        (dossiers.length > 0) 
        ?
          dossiers.map( 
            // Remarquez l'utilisation du "spread operator" pour "étaler" les 
            // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
            // fléchée dans les props du composant 'Dossier' !!
            dossier =>  <motion.li 
                          key={dossier.id}
                          layout={true}
                        >
                          <Dossier 
                            {...dossier} 
                            supprimer={supprimerDossier} 
                            modifier={modifierDossier}
                          />
                        </motion.li>
          )
        :
        <li className='aucun-dossier'>Aucun dossier</li>
      }
    </ul>
  );
}