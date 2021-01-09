export function initAd(): void {
  if (window.admob) {
    var adUnits = {
      ios: {
        banner: 'ca-app-pub-3940256099942544/6300978111', // process.env.REACT_APP_BANNER_AD_ID,
        interstitial: process.env.REACT_APP_INTERSTITIAL_AD_ID,
      },
      android: {
        banner: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx', //PUT ADMOB ADCODE HERE
        interstitial: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx', //PUT ADMOB ADCODE HERE
      },
    };
    var admobid = /(android)/i.test(navigator.userAgent) ? adUnits.android : adUnits.ios;

    window.admob.banner.config({
      id: admobid.banner,
      isTesting: true,
      autoShow: true,
    });

    window.admob.getTrackingStatus().then((status: string) => {
      // get status..
      if (status == 'notDetermined') {
        // not determined..

        (navigator as any).notification.confirm(
          'Hi we will track you down',
          () => {
            // open a native popup for infos..

            window.admob.trackingStatusForm().then((status: string) => {
              // iOS tracking form..
              window.admob.banner.prepare().then(() => window.admob.banner.show());

              if (status != 'authorized') {
                // not authorized show a motivation popup.. (optional)
                // navigator.notification.confirm..
              }
            });
          },
          'Use tracking?',
          'OK',
        );
      } else {
        // determined..

        window.admob.banner.prepare().then(() => window.admob.banner.show());

        if (status != 'authorized') {
          // not authorized show a motivation popup.. (optional)
          // navigator.notification.confirm..
        }
      }
    });
  }
}
