const userInfo = {
 avatar: "",
 split: "",
 website: "",
 name: "",
 info: ""
};

// crypto wallets
const cryptoWallets = [
 {
  symbol: "BTC",
  name: "Bitcoin",
  address: "bc1qglh6paejzdmu2w920mak40kvtesufcvqzu5mz0",
  qr: "bitcoin:bc1qglh6paejzdmu2w920mak40kvtesufcvqzu5mz0"
 },
 {
  symbol: "XHV",
  name: "Haven",
  address:
   "hvxy4jiG4bzLbegaQPVvJGcQjHvs6VJhSdqMtGxxgznz4mPvHWumXuKLGU3K7dXzLzH8UoMojq9kffi7y7M1fNsq1oiBahRj9V",
  qr:
   "haven:hvxy4jiG4bzLbegaQPVvJGcQjHvs6VJhSdqMtGxxgznz4mPvHWumXuKLGU3K7dXzLzH8UoMojq9kffi7y7M1fNsq1oiBahRj9V"
 },
 {
  symbol: "LTC",
  name: "Litecoin",
  address: "ltc1qvjyazjly2944rmalrtvpvl2zncfd7z8uher3mh",
  qr: "Litecoin:ltc1qvjyazjly2944rmalrtvpvl2zncfd7z8uher3mh"
 },
 {
  symbol: "XMR",
  name: "Monero",
  address:
   "49mSvMXTjVRX1CaRpbWckCWC8LA8pYTwwRfwQQWepvHy5iLVbGJXkcxVUds4KGEzK91Sx4z3RDkG9grdazUYt4MDRQXCnSd",
  qr:
   "monero:49mSvMXTjVRX1CaRpbWckCWC8LA8pYTwwRfwQQWepvHy5iLVbGJXkcxVUds4KGEzK91Sx4z3RDkG9grdazUYt4MDRQXCnSd"
 }
];

// number format filter
Vue.filter("toMoney", (num, decimals) => {
 let o = {
  style: "decimal",
  minimumFractionDigits: decimals,
  maximumFractionDigits: decimals
 };
 return new Intl.NumberFormat("en-US", o).format(num);
});

// vue instance
new Vue({
 el: "#card",

 // app data
 data: {
  userInfo,
  cryptoWallets,
  tab: "XMR",
  wallet: {},
  statsCache: {},
  stats: {}
 },

 // computed methods
 computed: {
  // compute list wallets for tabs
  walletsList() {
   return this.cryptoWallets.map((w) => {
    w.active = w.symbol === this.tab;
    return w;
   });
  }
 },

 // custom methods
 methods: {
  // select active tab wallet
  selectWallet(symbol) {
   let wallet = this.cryptoWallets.filter((w) => w.symbol === symbol).shift();
   if (!wallet) return;
   wallet.copied = 0;
   this.wallet = wallet;
   this.tab = symbol;
   this.fetchStats(symbol);
  },

  // copy text to clipboard
  copyText(txt) {
   txt = String(txt || "").trim();
   if (!txt) return;
   let input = document.createElement("input");
   document.body.appendChild(input);
   input.value = txt;
   input.select();
   document.execCommand("Copy");
   document.body.removeChild(input);
   this.wallet = Object.assign({}, this.wallet, { copied: 1 });
  },

  // get qr image url for selected wallet
  getQrImage() {
   const w = 180;
   const h = 180;
   const a = this.wallet.qr;
   return `https://chart.googleapis.com/chart?chs=${w}x${h}&cht=qr&choe=UTF-8&chl=${a}`;
  },

 


 // when component mounts
 mounted() {
  this.selectWallet(this.tab);
 }
});
