import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const opts = {
    theme: {
        dark: true,
        themes: {
            dark: {
                secondary: colors.blueGrey.lighten1,
                primary: colors.lightBlue.lighten3,
                accent: colors.pink.accent1,
                error: colors.red.lighten3,
            }
        }
    },
};

export default new Vuetify(opts)
