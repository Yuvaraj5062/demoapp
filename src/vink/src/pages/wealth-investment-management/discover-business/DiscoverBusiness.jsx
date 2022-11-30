import React from 'react'
import CharacterCommitmentCard from '../../../components/character-commitment-card/CharacterCommitmentCard'
import Title from '../../../components/title/Title'
import { discoverBusinessData } from '../../../data/data'
import styles from './discoverBusiness.module.scss'

const DiscoverBussiness = () => {
  return (
    <>
      <div className={styles.discoverBusinessContainer}>
        <div className={styles.title}>
          <Title title='Discover how our expertise can be a resource for your business.' />
        </div>

        <div className={styles.cardContainer}>
          {discoverBusinessData.map((item, index) => {
            return (
              <CharacterCommitmentCard
                key={index}
                characterCommitmentImg={item.characterCardImg}
                characterCommitmentTitle={item.characterCommitmentTitle}
                characterCommitmentInfo={item.characterCommitmentInfo}
                characterCommitmentBtn={item.characterCommitmentBtn}
                customClass={styles.cardLayout}
                customClassForImg={styles.imgStyle}
                customClassForTitle={styles.customClassForTitle}
                customClassForButton={styles.customClassForButton}
                customClassForInfo={styles.customClassForInfo}
              />
            );
          })}
        </div>
      </div>
    </>
  )
}

export default DiscoverBussiness