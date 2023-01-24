import MetaWorldImage from "../src/assets/metaworld-image.png";
import logo from "./logo.png";
import "./App.css";
import web3 from "./web3";
import myContract from "./myContract";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import CardExample from "./CardExample";
import { Grid } from "semantic-ui-react";
import Metaworld from "../src/assets/metaworld.png";
import Metaworld2 from "../src/assets/metaworld2.png";
import Metaworld3 from "../src/assets/metaworld3.png";

// import { useMetaMask } from "metamask-react";

class App extends React.Component {
  state = {
    owner: "",
    name: "",
    getMyChips: "",
    calculateChipSell: "",
    getBalance: "",
    chipRewards: "",
    stakeValue: 0,
    stakeIndex: 0,
    withdrawValue: 0,
    account: "",
    balance: "...",
    stakedBalance: "...",
    tableContent: [],
    isWin: false,
    showModal: false,
  };

  /*  
  static async getInitialProps(props) {
    const child = await web3.utils.fromWei(firstDepositAmount, 'ether');
    return {
          address: props.query.address
        };
  }
*/

  showData() {
    /*    myContract.methods.balance().call().then(wei => {
      this.setState({ balance: wei / (10 ** 18) });
    });
*/

    /*   myContract.methods.hasStake(this.state.account).call().then(stakedData => {
      this.setState({ stakedBalance: stakedData[0] / (10 ** 18) });
      this.setState({ tableContent: stakedData[1] });
      console.log(stakedData[1][0])
    });
*/

    myContract.methods
      .getBalance()
      .call()
      .then((wei) => {
        this.setState({ getBalance: wei / 10 ** 18 }).toFixed(2);
      });

    myContract.methods
      .getMyLand(this.state.account)
      .call()
      .then((wei) => {
        this.setState({ getMyLand: wei });
      });

    myContract.methods
      .owner()
      .call()
      .then((owner) => {
        this.setState({ owner });
      });

    myContract.methods
      .name()
      .call()
      .then((name) => {
        this.setState({ name });
      });

    myContract.methods
      .landTokensOwned(this.state.account)
      .call()
      .then((wei) => {
        this.setState({ landTokensOwned: wei / 10 ** 18 }).toFixed(2);
      });

    myContract.methods
      .calculateLandSell(this.state.account)
      .call()
      .then((wei) => {
        this.setState({ calculateLandSell: wei / 10 ** 18 });
      });
  }

  async componentDidMount() {
    window.ethereum.request({ method: "eth_requestAccounts" }).then(() => {
      web3.eth.requestAccounts().then((accounts) => {
        web3.eth.net.getId().then(async (netId) => {
          if (netId === 269) {
            this.setState({ account: accounts[0] });
            this.showData();
          } else {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x10d" }],
            });
            this.showData();
          }
        });
      });
    });
  }

  onSubmitBalanceOf = async (event) => {
    event.preventDefault();

    // this.setState({ message: 'Waiting on transaction success...' });

    // const accounts = await web3.eth.getAccounts();
    // await myContract.methods.balanceOf(this.state.account).send({
    //   from: accounts[0]
    // });

    // this.setState({ message: '' });
    // Router.replaceRoute(`/hpb/${this.props.address}`);
  };

  handleBuy2 = async () => {
    try {
      const gasPrice = await web3.eth.getGasPrice();
      const accounts = await web3.eth.getAccounts();

      await myContract.methods.buyLand(this.state.ref, this.state.amount).send({
        from: accounts[0],
        gasPrice: gasPrice,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleBuy = async (e) => {
    e.preventDefault();

    this.setState({ message: "Waiting on transaction success..." });

    const accounts = await web3.eth.getAccounts();
    //   const child = Child(this.props.address);
    await myContract.methods.buyLand(this.state.ref).send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.amount, "ether"),
    });

    this.setState({
      message: "First deposit successful!",
    });
  };

  handleBuy3 = async (e) => {
    e.preventDefault();
    try {
      const gasPrice = await web3.eth.getGasPrice();
      const accounts = await web3.eth.getAccounts();

      await myContract.methods.buyLand(this.state.ref, this.state.amount).send({
        from: accounts[0],
        gasPrice: gasPrice,
      });

      this.showData();
    } catch (error) {
      console.log(error);
    }
  };

  handleFry = async (e) => {
    e.preventDefault();
    this.setState({ message: "Waiting on transaction success..." });

    try {
      const gasPrice = await web3.eth.getGasPrice();

      await myContract.methods.reinvestProfits(this.state.ref).send({
        from: this.state.account,
        gasPrice: gasPrice,
      });

      this.showData();
    } catch (error) {
      console.log(error);
    }
  };

  handleSell = async (e) => {
    e.preventDefault();
    this.setState({ message: "Waiting on transaction success..." });

    try {
      const gasPrice = await web3.eth.getGasPrice();

      await myContract.methods.sellLand().send({
        from: this.state.account,
        gasPrice: gasPrice,
      });

      this.showData();
    } catch (error) {
      console.log(error);
    }
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    if (!this.state.account) {
      return (
        <div className="firstpage">
          <div className="Meta-world-header">
            Please connect your Metamask wallet to HPB to access Meta World
          </div>
          <img
            src={MetaWorldImage}
            className="Meta-world-image"
            alt="meta world"
          />
        </div>
      );
    }

    return (
      <div className="App">
        <div className="Meta-world-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p className="medium">
            Meta World - Official Contract Address (Verified)
            <br />
            <a
              rel="noreferrer"
              target="_blank"
              href="https://hscan.org/address/0x17a23ba8848dff11552c1343d76b151beaabfa12"
            >
              0x17a23ba8848dff11552c1343d76b151beaabfa12
            </a>
          </p>
        </div>
        <p>Up to 8% Daily Return! | Up to 2,920% APR! | Only 1% Dev Fee</p>
        <p className="small">
          Earn 5% of the HPB used to Buy land tokens or re-invest rents from
          anyone who uses your wallet address as a referral link!
        </p>
        <p className="medium">
          Total HPB in Meta World contract: {this.state.getBalance} HPB
        </p>
        <p className="paddedtext">
          You have [ {this.state.getMyLand} ] Land Tokens
        </p>
        <br />
        <p>Rent profits earned so far - [ {this.state.landTokensOwned} ] HPB</p>
        <p className="small">
          Check page regularly to see your profits rising! (may need to refresh
          page)
        </p>

        <div className="App">
          <Grid columns={3} divided>
            <Grid.Row>
              <Grid.Column>
                <CardExample
                  name="Buy Land"
                  description="Purchase Land tokens"
                  image={Metaworld}
                />
              </Grid.Column>
              <Grid.Column>
                <CardExample
                  name="Re-Invest"
                  description="Re-Invest your HPB earnings"
                  image={Metaworld2}
                />
              </Grid.Column>
              <Grid.Column>
                <CardExample
                  name="Cash Out"
                  description="Cash out the HPB you've earned"
                  image={Metaworld3}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <form onSubmit={this.handleBuy} className="mt-20">
                <div>
                  <label className="small">Amount to spend in HPB: </label>
                  <input
                    type="number"
                    min={0}
                    value={this.state.amount}
                    onChange={(event) =>
                      this.setState({ amount: event.target.value })
                    }
                  />
                  <br />
                  <label className="small">
                    Provide a Referral Wallet Address:{" "}
                  </label>
                  <input
                    type="address"
                    min={0}
                    value={this.state.ref}
                    onChange={(event) =>
                      this.setState({ ref: event.target.value })
                    }
                  />
                  <button className="small">BUY Land Tokens</button>
                </div>
              </form>
            </Grid.Column>

            <Grid.Column>
              <form onSubmit={this.handleFry} className="mt-20">
                <br />
                <div>
                  <p></p>
                  <label className="small">
                    Provide a Referral Wallet Address:{" "}
                  </label>
                  <input
                    type="address"
                    min={0}
                    value={this.state.ref}
                    onChange={(event) =>
                      this.setState({ ref: event.target.value })
                    }
                  />
                  <button className="small">Re-invest your earnings</button>
                </div>
              </form>
            </Grid.Column>

            <Grid.Column>
              <p></p>
              <p></p>
              <br />
              <label className="small">
                Cash out your earnings - WARNING - your APR% will reduce each
                time you do this!
              </label>
              <button onClick={this.handleSell} className="small">
                Cash out your earnings in HPB
              </button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />

        <p>You have [ {this.state.getMyLand} ] Land Tokens</p>
        <p>Rent earned so far - [ {this.state.landTokensOwned} ] HPB</p>
      </div>
    );
  }
}
export default App;
