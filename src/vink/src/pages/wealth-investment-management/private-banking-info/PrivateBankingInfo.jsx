import styles from "./privateBankingInfo.module.scss";

const PrivateBankingInfo = () => {
  return (
    <>
      <div className={styles.privateBankingContainer}>
        <div className={styles.paragraphOne}>
          Private Banking is provided by VMS Bank (the “Bank”). Advisory
          services are offered through VMS Bank Wealth Management Services,.
          d/b/a VMS Bank Private Wealth Advisors (“PWA”), a wholly owned
          subsidiary of the Bank and an investment adviser registered with the
          U.S. Securities and Exchange Commission (“SEC”). SEC registration does
          not constitute an endorsement of the advisory firm by the SEC nor does
          it indicate that the advisory firm has attained a particular level of
          skill or ability. Brokerage services are offered through Kingswood
          Capital Partners, LLC (“Kingswood”), Member FINRA/SIPC. VMS Bank
          Private Wealth Advisors and VMS Bank are not registered broker/dealers
          and are independent of Kingswood. Investments and insurance products
          are not insured by Bank insurance, the FDIC or any other government
          agency; are not deposits or obligations of the Bank; are not
          guaranteed by the Bank; and are subject to risks, including the
          possible loss of principal. Nothing herein is intended to constitute
          an offer to sell or buy, or a solicitation of an offer to sell or buy
          securities.
        </div>
        <div className={styles.paragraphTwo}>
          Investing is subject to a high degree of investment risk, including
          the possible loss of the entire amount of an investment. You should
          carefully read and review all information provided by PWA, including
          PWA’s Form ADV, Part 2A brochure and all supplements thereto, before
          making an investment.
        </div>
        <div>
          Neither PWA, the Bank nor any of their respective employees provides
          tax or legal advice. Nothing contained on this website (including any
          attachments) is intended as tax or legal advice for any recipient, nor
          should it be relied on as such. Taxpayers should seek advice based on
          the taxpayer’s particular circumstances from an independent tax
          advisor or legal counsel. The wealth strategy team at PWA can work
          with your attorney to facilitate the desired structure of your estate
          plan. The information contained on this website is not a complete
          summary or statement of all available data necessary for making an
          investment decision, and does not constitute a recommendation. The
          information has been obtained from sources considered to be reliable,
          but we do not guarantee that the foregoing material is accurate or
          complete. Any opinions are those of the authors and not necessarily
          those of PWA or the Bank.
        </div>
      </div>
    </>
  );
};

export default PrivateBankingInfo;
