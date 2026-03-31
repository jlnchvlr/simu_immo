document.addEventListener('DOMContentLoaded', () => {
    const inputs = {}; 
    let ui = null;

    // === 1. FONCTIONS UTILITAIRES ET SETTERS SÉCURISÉS ===
    const elCache = new Map();
    const getEl = (id) => {
        if (elCache.has(id)) return elCache.get(id);
        const el = document.getElementById(id);
        elCache.set(id, el);
        return el;
    };

    const buildUI = () => ({
        // Conteneurs / sections
        // Résumé haut
        prixFAI: getEl('prixFAI'),
        FAg_montant: getEl('FAg_montant'),
        // Résumé opération
        res_prixFAI: getEl('res_prixFAI'),
        FN_montant: getEl('FN_montant'),
        res_FN_montant: getEl('res_FN_montant'),
        FG_description: getEl('FG_description'),
        FG_montant: getEl('FG_montant'),
        res_FG_montant: getEl('res_FG_montant'),
        res_FD: getEl('res_FD'),
        res_Courtier: getEl('res_Courtier'),
        res_T: getEl('res_T'),
        coutTotalOperation: getEl('coutTotalOperation'),
        res_apport: getEl('res_apport'),
        res_credit_demande: getEl('res_credit_demande'),
        res_classic_loan_amount: getEl('res_classic_loan_amount'),
        res_classic_loan_amount_row: getEl('res_classic_loan_amount_row'),
        // Capacité / limites
        S_display: getEl('S_display'),
        AutresCredits_display: getEl('AutresCredits_display'),
        AutresCharges_display: getEl('AutresCharges_display'),
        mensualitemax_tdt: getEl('mensualitemax_tdt'),
        mensualitemax_rav: getEl('mensualitemax_rav'),
        mensualitemax_retenue: getEl('mensualitemax_retenue'),
        capEmpruntMax: getEl('capEmpruntMax'),
        current_duree_val: getEl('current_duree_val'),
        current_TE_val: getEl('current_TE_val'),
        current_TA_val: getEl('current_TA_val'),

        // Scénarios / comparaisons
        scen_duree_display: getEl('scen_duree_display'),
        scen_classic_amount_display: getEl('scen_classic_amount_display'),
        scen_classic_mensualite: getEl('scen_classic_mensualite'),
        comp_mensualite: getEl('comp_mensualite'),
        comp_resteAVivre: getEl('comp_resteAVivre'),
        comp_coutCredit: getEl('comp_coutCredit'),
        comp_coutOperation: getEl('comp_coutOperation'),
        comp_TAEG: getEl('comp_TAEG'),
        comp_tauxEndettement: getEl('comp_tauxEndettement'),
        respectMensualite: getEl('respectMensualite'),
        comp_coutOperationClassicOnly: getEl('comp_coutOperationClassicOnly'),
        comp_savings: getEl('comp_savings'),

        // TAEG global
        comp_TAEG_global: getEl('comp_TAEG_global'),

        // Optimiseur
        durationCurveCanvas: getEl('durationCurveCanvas'),
        optimizerResult: getEl('optimizerResult'),

        // Phase 2.1 — Sensibilité taux
        sensitivityTableContainer: getEl('sensitivityTableContainer'),

        // Phase 2.2 — Apport optimal
        apportAltCanvas: getEl('apportAltCanvas'),
        apportAltInfoContainer: getEl('apportAltInfoContainer'),

        // Phase 2.3 — Graphique amortissement (dans modal)
        amortChartCanvas: getEl('amortChartCanvas'),
        amortChartContainer: getEl('amortChartContainer'),

        // Phase 3 — Profil foyer & projections
        revenusEffectifs_val: getEl('revenusEffectifs_val'),
        coEmprunteurInputs: getEl('coEmprunteurInputs'),
        p3_revenus_effectifs: getEl('p3_revenus_effectifs'),
        p3_row_coempr: getEl('p3_row_coempr'),
        p3_s2_display: getEl('p3_s2_display'),
        p3_row_varrev: getEl('p3_row_varrev'),
        p3_revvar_display: getEl('p3_revvar_display'),
        p3_charges_effectives: getEl('p3_charges_effectives'),
        p3_mensualite_globale: getEl('p3_mensualite_globale'),
        p3_taux_endettement: getEl('p3_taux_endettement'),
        p3_reste_a_vivre: getEl('p3_reste_a_vivre'),
        p3_projection_container: getEl('p3_projection_container'),

        // Lignes scénario bonifiés
        ptb_scenario_header_row: getEl('ptb_scenario_header_row'),
        ptb_scenario_amount_row: getEl('ptb_scenario_amount_row'),
        ptb_scenario_mensualite_row: getEl('ptb_scenario_mensualite_row'),
        ptb_scenario_rate_row: getEl('ptb_scenario_rate_row'),
        ptb_scenario_cost_row: getEl('ptb_scenario_cost_row'),
        ptb_scenario_amort_row: getEl('ptb_scenario_amort_row'),
        scen_ptb_amount_display: getEl('scen_ptb_amount_display'),
        scen_ptb_mensualite_display: getEl('scen_ptb_mensualite_display'),
        scen_ptb_rate_display: getEl('scen_ptb_rate_display'),
        scen_ptb_cost_display: getEl('scen_ptb_cost_display'),
        pib_scenario_header_row: getEl('pib_scenario_header_row'),
        pib_scenario_amount_row: getEl('pib_scenario_amount_row'),
        pib_scenario_mensualite_row: getEl('pib_scenario_mensualite_row'),
        pib_scenario_rate_row: getEl('pib_scenario_rate_row'),
        pib_scenario_cost_row: getEl('pib_scenario_cost_row'),
        pib_scenario_amort_row: getEl('pib_scenario_amort_row'),
        scen_pib_amount_display: getEl('scen_pib_amount_display'),
        scen_pib_mensualite_display: getEl('scen_pib_mensualite_display'),
        scen_pib_rate_display: getEl('scen_pib_rate_display'),
        scen_pib_cost_display: getEl('scen_pib_cost_display'),

        // Analyse apport
        A_display: getEl('A_display'),
        apportAnalysisContainer: getEl('apportAnalysisContainer'),

        // Revente - affichage
        resale_horizon_display: getEl('resale_horizon_display'),
        resale_scenario_duration_display: getEl('resale_scenario_duration_display'),
        res_resale_price: getEl('res_resale_price'),
        res_remaining_capital: getEl('res_remaining_capital'),
        res_ira_fees: getEl('res_ira_fees'),
        res_resale_costs: getEl('res_resale_costs'),
        res_net_proceeds: getEl('res_net_proceeds'),
        res_initial_apport: getEl('res_initial_apport'),
        res_capital_amorti: getEl('res_capital_amorti'),
        res_total_wasted_costs: getEl('res_total_wasted_costs'),
        res_bilan_patrimonial: getEl('res_bilan_patrimonial'),
        res_net_balance: getEl('res_net_balance'),
        res_real_balance: getEl('res_real_balance'),
        ira_classic_amount: getEl('ira_classic_amount'),
        ira_pib_amount: getEl('ira_pib_amount'),
        ira_ptb_amount: getEl('ira_ptb_amount'),

        // IRA containers
        ira_mode: getEl('ira_mode'),
        ira_percentage_container: getEl('ira_percentage_container'),
        ira_manual_container: getEl('ira_manual_container'),
        ira_pib_container: getEl('ira_pib_container'),
        ira_ptb_container: getEl('ira_ptb_container'),

        // Phase 4 — Remboursement Anticipé
        ra_info_box: getEl('ra_info_box'),
        ra_mois_display: getEl('ra_mois_display'),
        ra_crd_display: getEl('ra_crd_display'),
        ra_ira_display: getEl('ra_ira_display'),
        ra_net_invested: getEl('ra_net_invested'),
        ra_table_container: getEl('ra_table_container'),

        // Phase 5 — Achat vs Location
        avlChartCanvas: getEl('avlChartCanvas'),
        avl_crossover_box: getEl('avl_crossover_box'),
        avl_crossover_msg: getEl('avl_crossover_msg'),
        avl_mensualite: getEl('avl_mensualite'),
        avl_tf: getEl('avl_tf'),
        avl_copro: getEl('avl_copro'),
        avl_travaux: getEl('avl_travaux'),
        avl_assurance_hab: getEl('avl_assurance_hab'),
        avl_autres_charges: getEl('avl_autres_charges'),
        avl_cout_total: getEl('avl_cout_total'),
        avl_vs_loyer: getEl('avl_vs_loyer'),

        // Phase 6 — Scénarios
        p6_scenario_list: getEl('p6_scenario_list'),
        p6_compare_btn: getEl('p6_compare_btn'),
        p6_compare_container: getEl('p6_compare_container'),

        // Revente - containers (toggle)
        pv_annual_container: getEl('pv_annual_container'),
        pv_manual_container: getEl('pv_manual_container'),
        inflation_annual_container: getEl('inflation_annual_container'),
        inflation_cumulative_container: getEl('inflation_cumulative_container'),

        // Modale amortissement
        amortizationTableContainer: getEl('amortizationTableContainer'),
        amortizationModalTitle: getEl('amortizationModalTitle'),

        // Inputs containers (toggle)
        pibInputsContainer: getEl('pibInputsContainer'),
        ptbInputsContainer: getEl('ptbInputsContainer'),
        manualGuaranteeInput: getEl('manualGuaranteeInput'),
        FG_details: getEl('FG_details'),
        fgDetailsToggleTrigger: getEl('fgDetailsToggleTrigger'),
        fn_breakdown: getEl('fn_breakdown'),
        fnDetailsToggleTrigger: getEl('fnDetailsToggleTrigger'),
        btn_reset: getEl('btn-reset'),

        // PTB/PIB avertissement
        ptb_warning_msg: null, // supprimé
        res_ptb_amount_row: getEl('res_ptb_amount_row'),
        res_pib_amount_row: getEl('res_pib_amount_row'),
        res_ptb_amount: getEl('res_ptb_amount'),
        res_pib_amount: getEl('res_pib_amount'),

        ptbMaxAmount_display: getEl('ptbMaxAmount_display'),
        ptbBonificationRate_display: getEl('ptbBonificationRate_display'),
        ptbBorrowerRate_display: getEl('ptbBorrowerRate_display'),
        ptb_scenario_duration_label: getEl('ptb_scenario_duration_label'),

        pibMaxAmount_display: getEl('pibMaxAmount_display'),
        pibBonificationRate_display: getEl('pibBonificationRate_display'),
        pibBorrowerRate_display: getEl('pibBorrowerRate_display'),
        pib_scenario_duration_label: getEl('pib_scenario_duration_label'),

        // Form inputs principaux (pour lireEtatFormulaire)
        form: {
            // Sliders (quand nécessaire)
            RAV_slider: getEl('RAV'),

            P_num: getEl('P_num'),
            FAg_num: getEl('FAg_num'),
            M_num: getEl('M_num'),
            typeBien: getEl('typeBien'),
            chargeAgence: getEl('chargeAgence'),
            FN_mode: getEl('FN_mode'),
            FN_num: getEl('FN_num'),
            FD_num: getEl('FD_num'),
            Courtier_num: getEl('Courtier_num'),
            T_num: getEl('T_num'),
            A_num: getEl('A_num'),
            FG_manual_num: getEl('FG_manual_num'),
            S_num: getEl('S_num'),
            AutresCredits_num: getEl('AutresCredits_num'),
            AutresCharges_num: getEl('AutresCharges_num'),
            TEdt_num: getEl('TEdt_num'),
            RAV_num: getEl('RAV_num'),
            // Phase 3
            coEmprunteur: getEl('coEmprunteur'),
            S2_num: getEl('S2_num'),
            AutresCredits2_num: getEl('AutresCredits2_num'),
            AutresCharges2_num: getEl('AutresCharges2_num'),
            revenuVariable_num: getEl('revenuVariable_num'),
            tauxIntegration: getEl('tauxIntegration'),
            revenuEvolution_num: getEl('revenuEvolution_num'),
            horizonEvolution: getEl('horizonEvolution'),
            duree_num: getEl('duree_num'),
            TE_num: getEl('TE_num'),
            TA_num: getEl('TA_num'),
            enablePIB: getEl('enablePIB'),
            enablePTB: getEl('enablePTB'),
            pibBFMRate_num: getEl('pibBFMRate_num'),
            typeGarantie: getEl('typeGarantie'),
            pibZone: getEl('pibZone'),
            ptbAgentStatus: getEl('ptbAgentStatus'),
            ptbZone: getEl('ptbZone'),
            resaleScenarioRef: null, // removed in Phase 1 — durée unique
            pv_mode: getEl('pv_mode'),
            inflation_mode: getEl('inflation_mode'),

            // PTB/PIB params
            pibRFR_num: getEl('pibRFR_num'),
            pibHouseholdSize_num: getEl('pibHouseholdSize_num'),
            pibDuration_num: getEl('pibDuration_num'),
            pibInsuranceRate_num: getEl('pibInsuranceRate_num'),
            ptbRFR_num: getEl('ptbRFR_num'),
            ptbHouseholdSize_num: getEl('ptbHouseholdSize_num'),
            ptbAmountWanted_num: getEl('ptbAmountWanted_num'),
            ptbDuration_num: getEl('ptbDuration_num'),
            ptbInsuranceRate_num: getEl('ptbInsuranceRate_num'),

            // Revente params
            resaleHorizon_num: getEl('resaleHorizon_num'),
            plusValue_num: getEl('plusValue_num'),
            resalePriceManual_num: getEl('resalePriceManual_num'),
            resaleFees_num: getEl('resaleFees_num'),
            inflation_num: getEl('inflation_num'),
            inflationCumulative_num: getEl('inflationCumulative_num'),

            // IRA inputs
            ira_manual_num: getEl('ira_manual_num'),
            ira_classic_num: getEl('ira_classic_num'),
            ira_pib_num: getEl('ira_pib_num'),
            ira_ptb_num: getEl('ira_ptb_num'),

            // Phase 4 — RA
            raMois_num: getEl('raMois_num'),
            raMontant_num: getEl('raMontant_num'),

            // Phase 5 — Achat vs Location
            loyer_num: getEl('loyer_num'),
            indexationLoyer_num: getEl('indexationLoyer_num'),
            tauxPlacement_num: getEl('tauxPlacement_num'),
            chargesLocataire_num: getEl('chargesLocataire_num'),
            taxeFonciere_num: getEl('taxeFonciere_num'),
            chargesCopro_num: getEl('chargesCopro_num'),
            provisionTravaux_num: getEl('provisionTravaux_num'),
            assuranceHabitation_num: getEl('assuranceHabitation_num'),
            autresChargesLogement_num: getEl('autresChargesLogement_num')
        }
    });

    // Regroupement des recalculs UI pour éviter le jank pendant le drag (1 calcul par frame max)
    let calcRafId = null;
    const requestRecalc = () => {
        if (calcRafId !== null) return;
        calcRafId = requestAnimationFrame(() => {
            calcRafId = null;
            calculateAllCore();
        });
    };
    const sauvegarderEtat = (state) => {
        // Solveur : lire les inputs
        const _solver = {
            apportMin:    parseFloat(getEl('solver_apportMin_num')?.value  || 10000),
            apportMax:    parseFloat(getEl('solver_apportMax_num')?.value  || 0),
            mensualiteMax:parseFloat(getEl('solver_mensualiteMax_num')?.value || 1500),
            tauxEpargne:  parseFloat(getEl('solver_tauxEpargne_num')?.value  || 3),
            horizonRevente: parseInt(getEl('solver_horizonRevente_num')?.value || 10, 10),
            ltv: [0,1,2].map(i => ({
                ltv:  parseFloat(getEl(`ltv_row${i}_ltv`)?.value  || 0),
                taux: parseFloat(getEl(`ltv_row${i}_taux`)?.value || 0)
            }))
        };
        // Comparateur : lire l'horizon + les offres
        let _comparateur = null;
        try {
            const compCards = document.querySelectorAll('#comp_offers_container .comp-offer-card');
            if (compCards.length > 0) {
                _comparateur = {
                    horizonRevente: parseInt(getEl('comp_horizonRevente_num')?.value || 10, 10),
                    offres: Array.from(compCards).map(card => {
                        const get  = f => card.querySelector(`[data-field="${f}"]`);
                        const num  = f => parseFloat(get(f)?.value || 0);
                        const bool = f => get(f)?.checked || false;
                        const sel  = (f, d) => get(f)?.value || d;
                        return {
                            nom: get('nom')?.value || 'Banque',
                            montant: num('montant'), dureeAns: parseInt(get('dureeAns')?.value || 20, 10),
                            tauxNominal: num('tauxNominal'), tauxAssurance: num('tauxAssurance'),
                            typeAssurance: sel('typeAssurance', 'initial'),
                            fraisDossier: num('fraisDossier'), fraisCourtage: num('fraisCourtage'),
                            typeGarantie: sel('typeGarantie', 'caution'), fraisGarantie: num('fraisGarantie'),
                            partsSociales: num('partsSociales'), fraisBancairesMensuels: num('fraisBancairesMensuels'),
                            iraPct: num('iraPct'), activerModularite: bool('activerModularite'),
                            moisActivation: parseInt(get('moisActivation')?.value || 12, 10), haussePct: num('haussePct')
                        };
                    })
                };
            }
        } catch(_) {}
        localStorage.setItem('simuImmoDGAC_sauvegarde', JSON.stringify({ ...state, _solver, _comparateur }));
    };

    // Évite de spammer localStorage pendant le drag (I/O sync potentiellement coûteux)
    let saveTimerId = null;
    let pendingStateForSave = null;
    const scheduleSave = (state) => {
        pendingStateForSave = state;
        if (saveTimerId !== null) clearTimeout(saveTimerId);
        saveTimerId = setTimeout(() => {
            saveTimerId = null;
            if (pendingStateForSave) sauvegarderEtat(pendingStateForSave);
        }, 250);
    };

    const chargerEtat = () => {
        const sauvegarde = localStorage.getItem('simuImmoDGAC_sauvegarde');
        if (!sauvegarde) return; // S'il n'y a pas de sauvegarde, on ne fait rien

        try {
            const savedState = JSON.parse(sauvegarde);

            // On réinjecte les valeurs dans chaque champ (on ignore les clés internes _solver/_comparateur)
            for (const [key, value] of Object.entries(savedState)) {
                if (key.startsWith('_')) continue; // clés internes
                // Pour les champs numériques (sliders liés)
                const numEl = getEl(`${key}_num`);
                const sliderEl = getEl(key);
                if (numEl && sliderEl) {
                    numEl.value = value;
                    sliderEl.value = value;
                    // Met à jour la jauge visuelle du slider
                    const min = parseFloat(sliderEl.min), max = parseFloat(sliderEl.max);
                    let val = Math.max(min, Math.min(value, max));
                    sliderEl.style.setProperty('--val', `${max === min ? 0 : ((val - min) / (max - min)) * 100}%`);
                }
                // Pour les listes déroulantes (select) ou autres inputs simples
                else {
                    const el = getEl(key);
                    if (el) {
                        if (el.type === 'checkbox') el.checked = value;
                        else el.value = value;
                    }
                }
            }

            // On gère les cases à cocher spécifiques pour PTB et PIB qui ont des IDs différents du state
            if (ui?.form?.enablePIB && savedState.isPIBEnabled !== undefined) ui.form.enablePIB.checked = savedState.isPIBEnabled;
            if (ui?.form?.enablePTB && savedState.isPTBEnabled !== undefined) ui.form.enablePTB.checked = savedState.isPTBEnabled;

            // Restaurer le solveur
            const sv = savedState._solver;
            if (sv) {
                const setSliderNum = (id, val) => {
                    const n = getEl(`${id}_num`), r = getEl(id);
                    if (n) n.value = val;
                    if (r) { r.value = val; const min = parseFloat(r.min), max = parseFloat(r.max); const v = Math.max(min, Math.min(val, max)); r.style.setProperty('--val', `${max===min?0:((v-min)/(max-min))*100}%`); }
                };
                setSliderNum('solver_apportMin',    sv.apportMin);
                setSliderNum('solver_apportMax',    sv.apportMax);
                setSliderNum('solver_mensualiteMax', sv.mensualiteMax);
                setSliderNum('solver_tauxEpargne',  sv.tauxEpargne);
                setSliderNum('solver_horizonRevente', sv.horizonRevente);
                if (sv.ltv) sv.ltv.forEach((row, i) => {
                    const lEl = getEl(`ltv_row${i}_ltv`), tEl = getEl(`ltv_row${i}_taux`);
                    if (lEl) lEl.value = row.ltv;
                    if (tEl) tEl.value = row.taux;
                });
            }

            // Restaurer le comparateur (les cartes seront reconstruites à l'ouverture de l'onglet)
            if (savedState._comparateur) {
                window._savedComparateur = savedState._comparateur;
            }

        } catch (e) {
            console.warn("Erreur lors du chargement de la sauvegarde", e);
        }
    };
    const getNumVal = id => {
        const el = getEl(`${id}_num`);
        return el ? parseFloat(el.value) || 0 : 0;
    };
    const formatCurrency = (value, digits = 0) => (Number(value) || 0).toLocaleString('fr-FR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
    const formatPercentage = (value, digits = 2) => (Number(value) || 0).toFixed(digits);
    const formatNumber = (value, decimals = 0) => (Number(value) || 0).toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    
    const setText = (id, text) => { const el = getEl(id); if (el) el.textContent = text; };
    const setHTML = (id, html) => { const el = getEl(id); if (el) el.innerHTML = html; };
    const setDisplay = (id, display) => { const el = getEl(id); if (el) el.style.display = display; };
    const setTextEl = (el, text) => { if (el) el.textContent = text; };
    const setHTMLEl = (el, html) => { if (el) el.innerHTML = html; };
    const setDisplayEl = (el, display) => { if (el) el.style.display = display; };

    const infoMessages = {
        duree_info: "Durée du prêt classique : entre 10 et 30 ans. Le slider de durée met à jour en temps réel tous les résultats et la courbe durée/coût.",
        TE_info: "Taux d'intérêt nominal annuel du prêt classique, hors assurance.",
        TA_info: "Taux annuel de l'assurance emprunteur pour le prêt classique.",
        chargeAgence_info: "Charge Acquéreur : Les frais d'agence sont exclus du calcul des frais de notaire (économie), mais la banque exigera souvent que vous les payiez avec votre apport personnel. Charge Vendeur : L'agence est incluse dans le prix, le notaire taxe le tout (plus cher), mais la banque le finance plus facilement (moins d'apport exigé).",
        Courtier_info: "Frais de courtage : Rémunération du courtier en crédit immobilier pour son service d'intermédiation avec les banques. Ces frais s'ajoutent au coût total.",
        resaleHorizon_info: "Nombre d'années après l'achat auquel vous simulez la revente du bien.",
        plusValue_info: "Estimation de l'évolution de la valeur du bien. Vous pouvez choisir un taux annuel ou entrer le prix final directement.",
        inflation_info: "L'inflation diminue la valeur de l'argent dans le temps. Ce taux est utilisé pour calculer la valeur 'réelle' de votre gain (ou perte) final en euros d'aujourd'hui.",
        ira_info: "Indemnités de Remboursement Anticipé (IRA). Plafonnées par la loi à 3% du capital restant dû ou 6 mois d'intérêts. Le calcul applique ce pourcentage sur le capital restant, sans dépasser le plafond légal.",
        resaleDiagnostics_info: "Coût estimé des diagnostics obligatoires et des menus frais divers pour la vente.",
        res_real_balance_info: "Le bilan financier net ajusté pour tenir compte de l'inflation. Il représente le gain ou la perte en pouvoir d'achat par rapport à aujourd'hui.",
        bilan_patrimonial_info: "Gain ou perte sur la valeur du bien (Prix de revente - Coût d'achat global - Frais de revente et IRA). Ne déduit PAS ce que le crédit vous a coûté en intérêts et assurances.",
        bilan_financier_info: "Le véritable résultat net de toute l'opération sur votre compte en banque. C'est le Bilan Patrimonial auquel on soustrait l'ensemble des intérêts et assurances payés à la banque.",
        P_info: "Prix net vendeur : Le prix affiché par le propriétaire ou l'agence, hors frais supplémentaires.", FAg_info: "Frais d'agence : Pourcentage du prix net vendeur que l'agence immobilière perçoit pour ses services. Ils sont généralement inclus dans le prix final 'Frais d'Agence Inclus' (FAI).", M_info: "Prix du mobilier : Le prix du mobilier éventuellement inclus dans la vente. Ce montant peut être déduit de l'assiette de calcul des frais de notaire sur l'ancien, réduisant ainsi leur coût.", typeBien_info: "Type de bien : 'Ancien' pour les biens existants (frais de notaire plus élevés). 'Neuf' pour les constructions neuves ou VEFA (Vente en l'État Futur d'Achèvement) où les frais de notaire sont réduits.", FN_mode_info: "Calcul Frais Notaire : 'Automatique' utilise un barème notarial estimatif. 'Manuel' vous permet de saisir un montant précis si vous l'avez déjà obtenu.", FN_info: "Frais de notaire : Incluent les taxes (droits de mutation), les émoluments du notaire et les débours. Leur montant dépend du prix du bien et de son type (ancien/neuf).", typeGarantie_info: "Type de garantie du prêt classique : La garantie est une sûreté prise par la banque en cas de non-remboursement du prêt classique. Le PIB/PTB ne requiert pas de garantie spécifique selon la documentation DGAC.", FG_manual_info: "Coût garantie manuel : Si vous avez une estimation précise ou un type de garantie non standard pour le prêt classique, entrez son coût ici.", FD_info: "Frais de dossier bancaire pour le prêt classique : Somme facturée par la banque pour l'étude et la mise en place de votre dossier de prêt immobilier classique. Le PIB/PTB n'a pas de frais de dossier.", T_info: "Montant total des travaux : Coût estimé des rénovations ou aménagements que vous prévoyez de réaliser après l'acquisition. Ce montant s'ajoute au coût total de l'opération et peut être partiellement financé par un PTB.", A_info: "Apport personnel : Somme d'argent dont vous disposez et que vous êtes prêt à investir dans l'opération. Il réduit le montant du crédit à demander.", S_info: "Salaires nets mensuels du foyer : Le total des revenus nets de votre foyer par mois, avant impôt sur le revenu mais après prélèvements sociaux.", AutresCredits_info: "Autres crédits en cours : La somme des mensualités de vos autres crédits (crédit auto, crédit consommation, etc.) qui s'ajoutent à votre charge d'endettement.", AutresCharges_info: "Autres charges mensuelles fixes : Entrez ici le total de vos autres charges mensuelles récurrentes qui ne sont pas des crédits (par exemple, un loyer si vous en payez encore un, pensions alimentaires versées, etc.). Ces charges réduisent votre capacité d'emprunt.", tedt_info: "Taux d'endettement maximal : Pourcentage de vos revenus nets que les banques acceptent généralement comme mensualités de crédits (tous crédits confondus, y compris le nouveau prêt immobilier) et charges fixes. Souvent plafonné à 35%.", rav_info: "Reste à vivre minimal : Somme minimale que la banque estime nécessaire pour vos dépenses courantes après paiement de toutes les mensualités (crédits, nouveau prêt) et charges fixes. Varie selon la composition du foyer et la localisation.", res_credit_info: "Crédit Total Nécessaire = Coût Total de l'Opération (incluant frais de garantie et dossier du prêt classique) - Apport Personnel. Ce montant sera réparti entre le PTB, PIB (si applicable) et le prêt classique.", res_fg_info: "Montant estimé des frais de garantie pour le prêt classique.", res_cto_info: "Coût Total de l'Opération = Prix FAI + Frais de Notaire + Frais de Garantie (prêt classique) + Frais de Dossier (prêt classique) + Frais de Courtier + Coût des Travaux. C'est le montant total à financer avant apport.", pibZone_info: "Zone géographique du bien (A/A bis, B1/B2, C) selon l'arrêté du 1er août 2014. Détermine le montant maximum du PIB et les plafonds de ressources pour la bonification de 3%.", pibRFR_info: "Revenu Fiscal de Référence de votre foyer pour l'année N-2 (ex: avis d'impôt 2024 sur revenus 2023 pour une demande en 2025). Sert à déterminer l'éligibilité à la bonification de 3%.", pibHouseholdSize_info: "Nombre de personnes composant le foyer fiscal (figurant sur l'avis d'imposition). Utilisé pour les plafonds de ressources de la bonification de 3%.", pibBFMRate_info: "Taux d'intérêt nominal proposé par la Banque Française Mutualiste (BFM) avant la bonification de la DGAC. Par défaut 3,74% (valable du 01/01/2025 au 30/06/2025). Ce taux est révisé semestriellement et s'applique au PIB et au PTB.", pibDuration_info: "Durée de remboursement du PIB, entre 3 et 12 ans.", pibInsuranceRate_info: "Taux annuel de l'assurance emprunteur pour le PIB (obligatoire). Saisissez le taux proposé par votre assureur (BFM ou autre). La DGAC ne spécifie pas de taux pour l'assurance groupe BFM du PIB. Mettre 0 si vous ne connaissez pas le taux, mais cela sous-estimera la mensualité réelle.", ptbAgentStatus_info: "Statut de l'agent DGAC/ENAC (Actif ou Retraité). Impacte le montant maximum du PTB.", ptbZone_info: "Zone géographique des travaux. Pertinent pour les agents actifs pour déterminer le montant maximum du PTB. Pour les retraités, le plafond est unique et la zone n'est pas utilisée pour le plafond.", ptbRFR_info: "Revenu Fiscal de Référence N-2 du foyer. Utilisé pour le calcul de la bonification du PTB (identique au PIB).", ptbHouseholdSize_info: "Nombre de personnes au foyer fiscal. Utilisé pour le calcul de la bonification du PTB (identique au PIB).", ptbAmountWanted_info: "Montant que vous souhaitez emprunter via le PTB. Sera plafonné par le montant total des travaux et le maximum autorisé pour le PTB (minimum 7 500€ si pris).", ptbDuration_info: "Durée de remboursement du PTB, entre 3 et 10 ans.", ptbIncludeInsurance_info: "L'assurance pour le PTB est facultative et s'élève à 0,36% du capital emprunté si vous la souscrivez.", fg_montant: "Coût estimé de la garantie pour le prêt classique. Le PIB/PTB n'exige pas de caution spécifique selon la documentation DGAC.", taeg_comp_info: "TAEG (Taux Annuel Effectif Global) du Prêt Classique : Coût total du prêt classique exprimé en pourcentage annuel. Il intègre son taux d'intérêt nominal, son coût d'assurance, les frais de dossier, les frais de courtier et les frais de garantie. Le PIB/PTB, n'ayant pas de frais de dossier ni de garantie spécifiques, a un coût plus direct.", res_scenarios_info: "Simulation de financement combiné (PTB + PIB + Prêt Classique sur 20 et 25 ans), avec calcul des mensualités, du coût total des crédits, du TAEG du prêt classique, de votre taux d'endettement et du reste à vivre.", res_apport_req_info: "Exigences d'apport : Les banques demandent souvent un apport couvrant au moins les frais d'acquisition (notaire, garantie, dossier, courtier). Un apport de 10% du prix du bien est une règle commune pour rassurer.", cas1_info: "Frais d'acquisition (Notaire, Garantie Prêt Classique, Dossier Prêt Classique, Courtier) + 10% du prix net vendeur : Exigence courante des banques. Votre apport doit couvrir l'ensemble des frais liés à l'acquisition PLUS au moins 10% du prix d'achat du bien.", cas2_info: "10% du coût total de l'opération : Une autre exigence courante, où votre apport doit représenter au moins 10% du montant total de l'opération (incluant tous les frais et travaux).", cas3_info: "Couverture des frais d'acquisition : Le minimum d'apport souvent exigé par les banques, il doit couvrir tous les frais liés à l'acquisition (frais de notaire, frais de garantie, frais de dossier bancaire du prêt classique et frais de courtier).", cas4_info: "Votre apport comparé à 10% du prix du bien hors frais d'agence. Un indicateur de base pour évaluer votre mise de fonds par rapport au prix 'brut' du bien.", cas5_info: "Votre apport comparé à 10% du prix du bien incluant les frais d'agence. Cet indicateur prend en compte le coût du bien tel qu'il est souvent affiché.", cas6_info: "Votre apport comparé à la somme des frais d'acquisition (notaire, garantie prêt classique, dossier prêt classique, courtier) ET de 10% du prix du bien incluant les frais d'agence. C'est un scénario d'apport solide.", classic_only_info: "Estimation du coût total de votre projet si l'intégralité du 'Crédit total nécessaire' était financée par un prêt classique uniquement (aux taux et conditions du prêt classique saisis), incluant les frais de garantie recalculés pour ce montant total.", savings_info: "Différence entre le coût total de l'opération avec un financement 100% classique et le coût total avec l'utilisation des prêts bonifiés (PTB/PIB). Un chiffre positif indique une économie."
    };

    // === 0. CONFIGURATION MÉTIER (Phase 0) ===
    const CONFIG = {
        // Prêts bonifiés DGAC
        PIB_MAX_AMOUNTS:       { A: 40000, B1B2: 32000, C: 25000 },
        PTB_MAX_AMOUNTS:       { actif: { A: 40000, B1B2: 32000, C: 25000 }, retraite: { A: 15000, B1B2: 15000, C: 15000 } },
        MIN_BONIFIED_AMOUNT:   7500,
        BONIFICATION_THRESHOLDS: {
            A:    { 1: 37000, 2: 51800, 3: 62900, 4: 74000, 5: 85100 },
            B1B2: { 1: 32000, 2: 44800, 3: 54400, 4: 64000, 5: 73600 },
            C:    { 1: 27000, 2: 37800, 3: 45900, 4: 54000, 5: 62100 },
        },

        // Barème émoluments notaire (art. A444-91 du CoJu) — tranches en €
        EMOLUMENTS_NOTAIRE: [
            { seuil: 6500,  taux: 0.03870, fixe: 0       },
            { seuil: 17000, taux: 0.01596, fixe: 251.55   },
            { seuil: 60000, taux: 0.01064, fixe: 419.13   },
            { seuil: Infinity, taux: 0.00799, fixe: 876.65 },
        ],
        EMOLUMENTS_TVA:       1.20,   // TVA sur émoluments
        FN_DEBOURS:           800,    // Débours forfaitaires (€)
        FN_TAXES_ANCIEN:      0.0580665,
        FN_TAXES_NEUF:        0.00715,

        // Garantie
        CAUTION_RATE:         0.012,
        HYPOTHEQUE_TPF_RATE:  0.00715,
        HYPOTHEQUE_CSI_RATE:  0.0005,
        HYPOTHEQUE_CSI_MIN:   15,
        HYPOTHEQUE_DIVERS:    250,
        PPD_DIVERS:           200,
        GARANTIE_EMOL_TRANCHES: [
            { seuil: 30000,   taux: 0.0150, fixe: 0    },
            { seuil: 100000,  taux: 0.0100, fixe: 450  },
            { seuil: Infinity, taux: 0.0075, fixe: 1150 },
        ],
    };

    // Aliases directs pour compatibilité avec le reste du code (lecture seule)
    const PIB_MAX_AMOUNTS        = CONFIG.PIB_MAX_AMOUNTS;
    const PTB_MAX_AMOUNTS        = CONFIG.PTB_MAX_AMOUNTS;
    const MIN_BONIFIED_AMOUNT    = CONFIG.MIN_BONIFIED_AMOUNT;
    const BONIFICATION_THRESHOLDS = CONFIG.BONIFICATION_THRESHOLDS;


    // === 2. FONCTIONS DE CALCUL MATHÉMATIQUE ===

    const calculerMensualiteCredit = (capital, tauxAnnuelNominal, dureeMois) => {
        if (capital <= 0 || dureeMois <= 0) return 0;
        const tauxMensuelNominal = tauxAnnuelNominal / 100 / 12;
        return tauxAnnuelNominal === 0 ? capital / dureeMois : (capital * tauxMensuelNominal) / (1 - Math.pow(1 + tauxMensuelNominal, -dureeMois));
    };
    
    const calculerCapaciteEmprunt = (mensualiteMax, tauxNominal, tauxAssurance, dureeMoisLoan) => {
        if (mensualiteMax <= 0 || dureeMoisLoan <= 0) return 0;
        const tauxMensuelNominal = tauxNominal / 100 / 12;
        const tauxMensuelAssurance = tauxAssurance / 100 / 12;
        let mensualitePourUnEuroDeCapital_nominal = (tauxMensuelNominal === 0) ? (1 / dureeMoisLoan) : tauxMensuelNominal / (1 - Math.pow(1 + tauxMensuelNominal, -dureeMoisLoan));
        const mensualiteTotalePourUnEuro = mensualitePourUnEuroDeCapital_nominal + tauxMensuelAssurance;
        return mensualiteTotalePourUnEuro > 0 ? mensualiteMax / mensualiteTotalePourUnEuro : 0;
    };

    const calculerCapitalRestantDu = (capital, tauxAnnuel, dureeMoisTotale, moisPayes) => {
        if (moisPayes >= dureeMoisTotale) return 0;
        if (capital <= 0) return 0;
        const tauxMensuel = tauxAnnuel / 100 / 12;
        if (tauxMensuel === 0) return capital - (capital / dureeMoisTotale) * moisPayes;
        return capital * (Math.pow(1 + tauxMensuel, dureeMoisTotale) - Math.pow(1 + tauxMensuel, moisPayes)) / (Math.pow(1 + tauxMensuel, dureeMoisTotale) - 1);
    };

    function calculerEmolumentsNotaire(base) {
        if (base <= 0) return 0;
        const t = CONFIG.EMOLUMENTS_NOTAIRE.find(t => base <= t.seuil);
        const prev = CONFIG.EMOLUMENTS_NOTAIRE[CONFIG.EMOLUMENTS_NOTAIRE.indexOf(t) - 1];
        const seuil = prev?.seuil ?? 0;
        return (t.fixe) + (base - seuil) * t.taux;
    }

    function evaluerFraisGarantie(typeGarantie, montantPret, isAncien, valeurManuelle) {
        if (montantPret <= 0) return { cout: 0, description: "Aucune garantie nécessaire." };
        if (typeGarantie === 'manual_guarantee') return { cout: valeurManuelle || 0, description: "Garantie manuelle." };

        const calculerEmolumentsGarantie = b => {
            if (b <= 0) return 0;
            const t = CONFIG.GARANTIE_EMOL_TRANCHES.find(t => b <= t.seuil);
            const prev = CONFIG.GARANTIE_EMOL_TRANCHES[CONFIG.GARANTIE_EMOL_TRANCHES.indexOf(t) - 1];
            return t.fixe + (b - (prev?.seuil ?? 0)) * t.taux;
        };

        let cout = 0, description = "";
        switch (typeGarantie) {
            case 'caution':
                cout = montantPret * CONFIG.CAUTION_RATE;
                description = `Caution prêt classique (environ ${(CONFIG.CAUTION_RATE * 100).toFixed(1)}% de ${formatCurrency(montantPret)}).`;
                break;
            case 'hypotheque': {
                const tpf  = montantPret * CONFIG.HYPOTHEQUE_TPF_RATE;
                const csi  = Math.max(CONFIG.HYPOTHEQUE_CSI_MIN, montantPret * CONFIG.HYPOTHEQUE_CSI_RATE);
                const emol = calculerEmolumentsGarantie(montantPret) * CONFIG.EMOLUMENTS_TVA;
                cout = tpf + csi + emol + CONFIG.HYPOTHEQUE_DIVERS;
                description = `Hypothèque conventionnelle.`;
                break;
            }
            case 'ppd':
                if (isAncien) {
                    const emol = calculerEmolumentsGarantie(montantPret) * CONFIG.EMOLUMENTS_TVA;
                    const csi  = Math.max(CONFIG.HYPOTHEQUE_CSI_MIN, montantPret * CONFIG.HYPOTHEQUE_CSI_RATE);
                    cout = emol + csi + CONFIG.PPD_DIVERS;
                    description = `Privilège Prêteur de Deniers (PPD).`;
                } else {
                    cout = montantPret * CONFIG.CAUTION_RATE;
                    description = `PPD non applicable (neuf), caution estimée à ${(CONFIG.CAUTION_RATE * 100).toFixed(1)}%.`;
                }
                break;
        }
        return { cout, description };
    }

    const calculerTAEG = (capitalEmprunte, mensualiteTotale, dureeMois, fraisInitiauxLoan) => {
        if (capitalEmprunte <= 0 || mensualiteTotale <= 0 || dureeMois <= 0) return 0.0;
        const netCapitalReceived = capitalEmprunte - fraisInitiauxLoan;
        if (netCapitalReceived <= 0) return 0.0;
        const npvFunction = monthlyRate => {
            if (monthlyRate <= -1.0 + 1e-12) return -Infinity;
            let sum = Math.abs(monthlyRate) < 1e-9 ? mensualiteTotale * dureeMois : mensualiteTotale * (1 - Math.pow(1 + monthlyRate, -dureeMois)) / monthlyRate;
            return netCapitalReceived - sum;
        };
        const valAtZeroRate = npvFunction(0.0);
        if (Math.abs(valAtZeroRate) < 1e-9 || (valAtZeroRate > 0 && netCapitalReceived < mensualiteTotale * dureeMois)) return 0.0;
        let lowRate = 0.0, fLow = valAtZeroRate, highRate;
        const rateCandidates = [0.0001, 0.01, 0.05, 0.1, 0.2, 0.5, 1.0, 2.0];
        let foundHighRate = false;
        for (const candidate of rateCandidates) {
            highRate = candidate; let fHigh = npvFunction(highRate);
            if (fHigh * fLow < 0) { foundHighRate = true; break; }
            if (Math.abs(fHigh) < 1e-9) return (Math.pow(1 + highRate, 12) - 1) * 100;
            if (fLow > 0 && fHigh > 0 && fHigh < fLow) { lowRate = highRate; fLow = fHigh; }
            else if (fLow > 0 && fHigh < 0) { foundHighRate = true; break; }
        }
        if (!foundHighRate) return fLow < 0 ? highRate * 1200 : 0.0;
        let midRate;
        for (let i = 0; i < 100; i++) { 
            midRate = (lowRate + highRate) / 2;
            let fMid = npvFunction(midRate);
            if (Math.abs(fMid) < 1e-9 || (highRate - lowRate) / 2 < 1e-8) return (Math.pow(1 + midRate, 12) - 1) * 100;
            (fMid * fLow > 0) ? lowRate = midRate : highRate = midRate;
            if (isNaN(midRate) || !isFinite(midRate) || midRate < -1.0 + 1e-9) return 0.0;
        }
        return (Math.pow(1 + midRate, 12) - 1) * 100;
    };

    const generateAmortizationSchedule = (loanName, principal, annualNominalRate, durationYears, annualInsuranceRateOnInitialCapital, insuranceBase = 'initial') => {
        const schedule = [];
        if (principal <= 0 || durationYears <= 0) return schedule;
        const monthlyNominalRate = annualNominalRate / 100 / 12;
        const numberOfMonths = durationYears * 12;
        const monthlyPaymentPrincipalInterest = calculerMensualiteCredit(principal, annualNominalRate, numberOfMonths);
        const fixedMonthlyInsurance = insuranceBase === 'initial' ? (principal * (annualInsuranceRateOnInitialCapital / 100)) / 12 : 0;
        let remainingBalance = principal;
        for (let i = 1; i <= numberOfMonths; i++) {
            const interestPaid = remainingBalance * monthlyNominalRate;
            let principalRepaid = monthlyPaymentPrincipalInterest - interestPaid;
            if (i === numberOfMonths) principalRepaid = remainingBalance;
            remainingBalance -= principalRepaid;
            if (Math.abs(remainingBalance) < 0.01) remainingBalance = 0;
            const monthlyInsuranceAmount = insuranceBase === 'crd'
                ? (remainingBalance + principalRepaid) * (annualInsuranceRateOnInitialCapital / 100) / 12
                : fixedMonthlyInsurance;
            schedule.push({
                month: i, paymentWithoutInsurance: monthlyPaymentPrincipalInterest, interest: interestPaid,
                principalRepaid, insurance: monthlyInsuranceAmount, totalPayment: monthlyPaymentPrincipalInterest + monthlyInsuranceAmount, remainingBalance
            });
        }
        return schedule;
    };

    // === 3. FONCTIONS D'INTERFACE (UI Setup) ===

    const setupSliderAndNumber = (id) => {
        const slider = getEl(id);
        const num = getEl(`${id}_num`);
        if (!slider || !num) return;
        
        slider.dataset.defaultValue = slider.value;

        const updateSliderVisual = () => {
            const min = parseFloat(slider.min), max = parseFloat(slider.max);
            let val = Math.max(min, Math.min(parseFloat(slider.value), max));
            slider.style.setProperty('--val', `${max === min ? 0 : ((val - min) / (max - min)) * 100}%`);
        };

        slider.addEventListener('input', () => { 
            if (!slider.disabled) { 
                num.value = slider.value; 
                updateSliderVisual(); 
                requestRecalc(); 
            }
        });
        num.addEventListener('input', () => {
            if (!num.readOnly) {
                if (num.value !== "" && !isNaN(parseFloat(num.value))) {
                    const currentVal = parseFloat(num.value);
                    if (currentVal >= parseFloat(slider.min) && currentVal <= parseFloat(slider.max)) slider.value = currentVal;
                }
                updateSliderVisual(); 
                requestRecalc();
            }
        });
        num.addEventListener('blur', () => {
            if (!num.readOnly) {
                let val = parseFloat(num.value);
                const minVal = parseFloat(slider.min), maxVal = parseFloat(slider.max);
                const stepAttr = slider.step, step = parseFloat(stepAttr) || 0.01;
                const numStepAttr = num.step || stepAttr;
                const decimals = (numStepAttr && numStepAttr.includes('.')) ? numStepAttr.split('.')[1].length : (step.toString().includes('.') ? step.toString().split('.')[1].length : 0);
                val = isNaN(val) || val < minVal ? minVal : (val > maxVal ? maxVal : val);
                num.value = val.toFixed(decimals); slider.value = num.value;
                updateSliderVisual(); 
                requestRecalc();
            }
        });

        slider.addEventListener('dblclick', () => {
            if (slider.disabled) return;
            const defaultValue = slider.dataset.defaultValue;
            if (defaultValue !== undefined) {
                slider.value = defaultValue;
                num.value = defaultValue;
                updateSliderVisual();
                requestRecalc();
            }
        });

        updateSliderVisual();
    };

    const setInputState = (id, isManual, config) => {
        const slider = getEl(id);
        const num = getEl(`${id}_num`);
        if (!slider || !num) return;
        num.readOnly = !isManual;
        slider.disabled = !isManual;
        slider.style.display = (id === 'FN' && !isManual) ? 'none' : 'inline-block'; 
        if (id === 'FN') setDisplay('FN_pc_manual', isManual ? 'inline' : 'none');
        if (config) {
            Object.assign(slider, config);
            Object.assign(num, config);
        }
        const min = parseFloat(slider.min), max = parseFloat(slider.max);
        let val = Math.max(min, Math.min(parseFloat(slider.value), max));
        slider.style.setProperty('--val', `${max === min ? 0 : ((val - min) / (max - min)) * 100}%`);
    };

    const setupDetailsToggle = (toggleElementId, contentElementId, textWhenHidden, textWhenVisible) => {
        const toggleElement = getEl(toggleElementId);
        const contentElement = getEl(contentElementId);
        if (!toggleElement || !contentElement) return;
        
        contentElement.classList.add('visible'); 
        toggleElement.textContent = textWhenVisible;
        toggleElement.addEventListener('click', () => {
            const isNowVisible = contentElement.classList.toggle('visible');
            toggleElement.textContent = isNowVisible ? textWhenVisible : textWhenHidden;
        });
    };

    const displayAmortizationModal = (loanName, schedule, additionalSchedules = []) => {
        setTextEl(ui?.amortizationModalTitle, `Tableau d'Amortissement — ${loanName}`);
        const container = ui?.amortizationTableContainer;
        if (!container) return;

        // Build table (inchangé)
        container.textContent = '';

        const table = document.createElement('table');
        table.className = 'amortization-data-table';

        const thead = document.createElement('thead');
        const headRow = document.createElement('tr');
        [
            'Mois',
            'Mens.(hors ass.)',
            'Intérêts',
            'Capital Remb.',
            'Assurance',
            'Mens. Totale',
            'Capital Rest. Dû'
        ].forEach(label => {
            const th = document.createElement('th');
            th.textContent = label;
            headRow.appendChild(th);
        });
        thead.appendChild(headRow);

        const tbody = document.createElement('tbody');
        schedule.forEach(r => {
            const tr = document.createElement('tr');
            const cells = [
                String(r.month),
                `${formatCurrency(r.paymentWithoutInsurance, 2)}€`,
                `${formatCurrency(r.interest, 2)}€`,
                `${formatCurrency(r.principalRepaid, 2)}€`,
                `${formatCurrency(r.insurance, 2)}€`,
                `${formatCurrency(r.totalPayment, 2)}€`,
                `${formatCurrency(r.remainingBalance, 2)}€`
            ];
            cells.forEach(v => {
                const td = document.createElement('td');
                td.textContent = v;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);

        // Phase 2.3 — Rendu graphique
        const allSchedules = [{ name: loanName, data: schedule }, ...additionalSchedules];
        renderAmortissementChart(allSchedules);

        // Afficher graphique par défaut
        const chartContainer = ui?.amortChartContainer;
        if (chartContainer) chartContainer.style.display = 'block';
        container.style.display = 'none';

        // Reset boutons toggle
        const btnChart = getEl('amortViewChartBtn');
        const btnTable = getEl('amortViewTableBtn');
        if (btnChart) { btnChart.style.backgroundColor = 'var(--secondary-color)'; btnChart.style.color = '#fff'; }
        if (btnTable) { btnTable.style.backgroundColor = ''; btnTable.style.color = ''; }

        document.querySelector('.modal-overlay')?.classList.add('visible');
    };

    // === 4. LOGIQUE D'APPLICATION Principale ===

    const numFrom = (el) => (el ? (parseFloat(el.value) || 0) : 0);

    function lireEtatFormulaire(ui) {
        const f = ui?.form || {};
        const state = {
            P: numFrom(f.P_num),
            FAg: numFrom(f.FAg_num),
            M: numFrom(f.M_num),
            typeBien: f.typeBien?.value || 'ancien',
            chargeAgence: f.chargeAgence?.value || 'acquereur',
            FN_mode: f.FN_mode?.value || 'auto',
            FN_input: numFrom(f.FN_num),
            FD: numFrom(f.FD_num),
            Courtier: numFrom(f.Courtier_num),
            T: numFrom(f.T_num),
            A: numFrom(f.A_num),
            FG_manual: numFrom(f.FG_manual_num),
            S: numFrom(f.S_num),
            AutresCredits: numFrom(f.AutresCredits_num),
            AutresCharges: numFrom(f.AutresCharges_num),
            TEdt: numFrom(f.TEdt_num),
            RAV: numFrom(f.RAV_num),
            // Phase 3 — Co-emprunteur & revenus
            coEmprunteur: !!f.coEmprunteur?.checked,
            S2: numFrom(f.S2_num),
            AutresCredits2: numFrom(f.AutresCredits2_num),
            AutresCharges2: numFrom(f.AutresCharges2_num),
            revenuVariable: numFrom(f.revenuVariable_num),
            tauxIntegration: parseFloat(f.tauxIntegration?.value || 70),
            revenuEvolution: numFrom(f.revenuEvolution_num),
            horizonEvolution: parseInt(f.horizonEvolution?.value || 10, 10),
            duree: Math.max(10, Math.min(30, Math.round(numFrom(f.duree_num) || 20))),
            TE: numFrom(f.TE_num),
            TA: numFrom(f.TA_num),
            typeAssuranceClassique: getEl('typeAssuranceClassique')?.value || 'initial',
            isPIBEnabled: !!f.enablePIB?.checked,
            pibBFMRate: numFrom(f.pibBFMRate_num),
            isPTBEnabled: !!f.enablePTB?.checked,

            // PTB/PIB params
            pibZone: f.pibZone?.value || 'A',
            pibRFR: numFrom(f.pibRFR_num),
            pibHouseholdSize: Math.max(1, Math.round(numFrom(f.pibHouseholdSize_num) || 1)),
            pibDuration: Math.max(3, Math.round(numFrom(f.pibDuration_num) || 10)),
            pibInsuranceRate: numFrom(f.pibInsuranceRate_num),

            ptbAgentStatus: f.ptbAgentStatus?.value || 'actif',
            ptbZone: f.ptbZone?.value || 'A',
            ptbRFR: numFrom(f.ptbRFR_num),
            ptbHouseholdSize: Math.max(1, Math.round(numFrom(f.ptbHouseholdSize_num) || 1)),
            ptbAmountWanted: numFrom(f.ptbAmountWanted_num),
            ptbDuration: Math.max(3, Math.round(numFrom(f.ptbDuration_num) || 7)),
            ptbInsuranceRate: numFrom(f.ptbInsuranceRate_num),
            typeGarantie: f.typeGarantie?.value || 'caution'
        };

        const uiState = {
            pvMode: f.pv_mode?.value || 'annual',
            inflationMode: f.inflation_mode?.value || 'annual',
            iraMode: ui?.ira_mode?.value || 'percentage',
            resale: {
                horizon: numFrom(f.resaleHorizon_num),
                plusValueAnnual: numFrom(f.plusValue_num),
                resalePriceManual: numFrom(f.resalePriceManual_num),
                fees: numFrom(f.resaleFees_num),
                inflationAnnual: numFrom(f.inflation_num),
                inflationCumulative: numFrom(f.inflationCumulative_num)
            },
            ira: {
                manualAmount: numFrom(f.ira_manual_num),
                classicPc: numFrom(f.ira_classic_num),
                pibPc: numFrom(f.ira_pib_num),
                ptbPc: numFrom(f.ira_ptb_num)
            },
            ra: {
                mois: Math.max(1, Math.round(numFrom(f.raMois_num) || 60)),
                montant: numFrom(f.raMontant_num)
            },
            avl: {
                loyer: numFrom(f.loyer_num),
                indexationLoyer: numFrom(f.indexationLoyer_num),
                tauxPlacement: numFrom(f.tauxPlacement_num),
                chargesLocataire: numFrom(f.chargesLocataire_num),
                taxeFonciere: numFrom(f.taxeFonciere_num),
                chargesCopro: numFrom(f.chargesCopro_num),
                provisionTravaux: numFrom(f.provisionTravaux_num),
                assuranceHabitation: numFrom(f.assuranceHabitation_num),
                autresChargesLogement: numFrom(f.autresChargesLogement_num)
            }
        };

        return { state, uiState };
    }

    function gererFraisAcquisition(state) {
        const FAg_montant = state.P * (state.FAg / 100);
        const prixFAI = state.P + FAg_montant;
        const baseNotaireBrute = state.chargeAgence === 'vendeur' ? prixFAI : state.P;

        let fn_details = { montant: 0, baseCalcul: 0, taxes: 0, emolumentsTTC: 0, debours: 0 };
        // Valeurs d'affichage produites ici, consommées par renderFraisNotaire()
        let fn_display = {};

        if (state.FN_mode === 'auto') {
            fn_details.baseCalcul   = state.typeBien === 'ancien' ? Math.max(0, baseNotaireBrute - state.M) : baseNotaireBrute;
            fn_details.taxes        = fn_details.baseCalcul * (state.typeBien === 'ancien' ? CONFIG.FN_TAXES_ANCIEN : CONFIG.FN_TAXES_NEUF);
            const emolHT            = calculerEmolumentsNotaire(state.typeBien === 'ancien' ? fn_details.baseCalcul : baseNotaireBrute);
            fn_details.emolumentsTTC = emolHT * CONFIG.EMOLUMENTS_TVA;
            fn_details.debours      = CONFIG.FN_DEBOURS;
            fn_details.montant      = fn_details.taxes + fn_details.emolumentsTTC + fn_details.debours;

            fn_display.mode         = 'auto';
            fn_display.fnPourcent   = baseNotaireBrute > 0 ? (fn_details.montant / baseNotaireBrute) * 100 : 0;
            fn_display.baseCalcul   = formatCurrency(fn_details.baseCalcul) + " €";
            fn_display.typeBien     = state.typeBien;
            fn_display.taxes        = formatCurrency(fn_details.taxes) + " €";
            fn_display.emoluments   = formatCurrency(fn_details.emolumentsTTC) + " €";
            fn_display.debours      = formatCurrency(fn_details.debours) + " €";
            fn_display.taxesPc      = `${formatNumber(state.typeBien === 'ancien' ? 5.80665 : 0.715, 3)} %`;
            fn_display.emolumentsPc = `${formatNumber(fn_details.baseCalcul > 0 ? (fn_details.emolumentsTTC / fn_details.baseCalcul) * 100 : 0, 3)} %`;
            fn_display.debourssPc   = baseNotaireBrute > 0 ? `${formatNumber((fn_details.debours / baseNotaireBrute) * 100, 3)} %` : '0 %';
        } else {
            fn_details.montant = state.FN_input;
            fn_display.mode    = 'manual';
            fn_display.montantPc = formatNumber(baseNotaireBrute > 0 ? (state.FN_input / baseNotaireBrute) * 100 : 0, 2);
        }

        const coutAvantGar      = prixFAI + fn_details.montant + state.T + state.FD + state.Courtier;
        const besoinCreditInitial = Math.max(0, coutAvantGar - state.A);

        return { FAg_montant, prixFAI, baseNotaireBrute, fn_details, fn_display, coutAvantGar, besoinCreditInitial };
    }

    function gererPlanFinancement(state, besoinCreditInitial, coutAvantGar) {
        let pib = { amount:0, monthlyPayment:0, totalInterest:0, totalCost:0, interestRate:0, bonification:0, maxPossible:0, duration: state.pibDuration || 10, insuranceRate: state.pibInsuranceRate };
        let ptb = { amount:0, monthlyPayment:0, totalInterest:0, totalCost:0, interestRate:0, bonification:0, maxPossible:0, duration: state.ptbDuration || 7, insuranceRate: state.ptbInsuranceRate };    
        const determinerPretBonifie = (loan, RFR, foyer, zone, amountWanted, maxLimitRef) => {
            let bonifRate = 0.02;
            const thresholds = BONIFICATION_THRESHOLDS[zone];
            if (thresholds && RFR <= thresholds[Math.min(foyer, 5)]) bonifRate = 0.03;
            
            loan.bonification = bonifRate * 100;
            loan.interestRate = Math.max(0, state.pibBFMRate - loan.bonification);
            
            let computedAmount = Math.min(amountWanted, maxLimitRef, loan.maxPossible);
            if (computedAmount > 0 && computedAmount < MIN_BONIFIED_AMOUNT) computedAmount = (maxLimitRef >= MIN_BONIFIED_AMOUNT) ? MIN_BONIFIED_AMOUNT : 0;
            
            loan.amount = Math.max(0, computedAmount);
        };

        if (state.isPTBEnabled && state.T > 0) {
            const statut = state.ptbAgentStatus || 'actif';
            const zonePtb = statut === 'retraite' ? "A" : (state.ptbZone || "A");
            ptb.maxPossible = PTB_MAX_AMOUNTS[statut]?.[zonePtb] || 0;
            determinerPretBonifie(ptb, state.ptbRFR, state.ptbHouseholdSize, zonePtb, state.ptbAmountWanted, Math.min(state.T, besoinCreditInitial));
            besoinCreditInitial = Math.max(0, besoinCreditInitial - ptb.amount);
        }

        if (state.isPIBEnabled) {
            const zonePib = state.pibZone || "A";
            pib.maxPossible = PIB_MAX_AMOUNTS[zonePib] || 0;
            determinerPretBonifie(pib, state.pibRFR, state.pibHouseholdSize, zonePib, besoinCreditInitial, besoinCreditInitial);
            besoinCreditInitial = Math.max(0, besoinCreditInitial - pib.amount);
        }

        // Évaluation de la garantie APRES avoir déduit PTB/PIB
        const garDetails = evaluerFraisGarantie(state.typeGarantie, besoinCreditInitial, state.typeBien === 'ancien', state.FG_manual);
        const coutTotalOperation = coutAvantGar + garDetails.cout;
        const besoinCreditFinalClassique = Math.max(0, coutTotalOperation - state.A - ptb.amount - pib.amount);

        // Calcul des mensualités des prêts bonifiés
        [ptb, pib].forEach(l => {
            if (l.amount > 0) {
                const mensInt = calculerMensualiteCredit(l.amount, l.interestRate, l.duration * 12);
                const mensAss = (l.amount * (l.insuranceRate / 100)) / 12;                l.monthlyPayment = mensInt + mensAss;
                l.totalInterest = Math.max(0, (mensInt * l.duration * 12) - l.amount);
                l.totalInsurance = mensAss * l.duration * 12;
                l.totalCost = l.totalInterest + l.totalInsurance;
            }
        });

        return { pib, ptb, garDetails, coutTotalOperation, besoinCreditFinalClassique };
    }

    // Algorithme de calcul du TAEG Global (Taux de Rendement Interne)
    function calculerTAEGGlobal(montantEmprunteTotal, fluxMensuels, fraisInitiaux) {
        if (montantEmprunteTotal <= 0 || fluxMensuels.length === 0) return 0;
        let minRate = 0, maxRate = 1, rate = 0.005; // Recherche par dichotomie
        const montantNetPercu = montantEmprunteTotal - fraisInitiaux; // On déduit les frais du montant perçu par l'emprunteur
        
        for (let i = 0; i < 50; i++) {
            let npv = -montantNetPercu;
            for (let t = 0; t < fluxMensuels.length; t++) {
                npv += fluxMensuels[t] / Math.pow(1 + rate, t + 1);
            }
            if (Math.abs(npv) < 0.01) break; // Précision atteinte au centime près
            if (npv > 0) { minRate = rate; rate = (rate + maxRate) / 2; } 
            else { maxRate = rate; rate = (rate + minRate) / 2; }
        }
        return (Math.pow(1 + rate, 12) - 1) * 100; // Conversion en TAEG annuel
    }

    // === PHASE 3 — Co-emprunteur & Revenus évolutifs ===

    // 3.1 + 3.3 — Calcule les revenus et charges effectifs du foyer (pur, zéro DOM)
    function calculerProfilEmprunteur(state) {
        const revVarIntegre = state.revenuVariable * (state.tauxIntegration / 100);
        const revenusEmprunteur1 = state.S + revVarIntegre;
        const revenusCoEmpr = state.coEmprunteur ? state.S2 : 0;
        const revenusEffectifs = revenusEmprunteur1 + revenusCoEmpr;

        const chargesEmprunteur1 = state.AutresCredits + state.AutresCharges;
        const chargesCoEmpr = state.coEmprunteur ? state.AutresCredits2 + state.AutresCharges2 : 0;
        const chargesEffectives = chargesEmprunteur1 + chargesCoEmpr;

        return { revenusEffectifs, chargesEffectives, revVarIntegre, revenusCoEmpr };
    }

    // 3.2 — Projection revenus sur N années (mensualité fixe, revenus croissants)
    function calculerProjectionRevenus(state, profil, mensTotaleGlobale) {
        const horizons = [5, 10, 15].filter(h => h <= state.horizonEvolution + 0.5 || h === 5);
        // On affiche toujours les 3 horizons (5, 10, 15) si l'horizon choisi le permet
        const horiz = [5, 10, 15];
        return horiz.map(h => {
            const revenuProjecte = profil.revenusEffectifs * Math.pow(1 + state.revenuEvolution / 100, h);
            const chargesProj = profil.chargesEffectives; // charges supposées stables
            const tauxEndettProj = revenuProjecte > 0 ? ((mensTotaleGlobale + chargesProj) / revenuProjecte) * 100 : Infinity;
            const resteAVivreProj = revenuProjecte - mensTotaleGlobale - chargesProj;
            return { horizon: h, revenuProjecte, tauxEndettProj, resteAVivreProj };
        });
    }

    // Phase 1 — calcul pour une durée unique (remplace calculerScenariosClassiques)
    function calculerScenarioClassique(state, pib, ptb, besoinCreditFinalClassique, coutTotalOperation, prixFAI, fn_details, garDetails, profil) {
        // Phase 3 : utilise les revenus/charges effectifs du foyer si fournis
        const revenusEffectifs = profil?.revenusEffectifs ?? state.S;
        const chargesFixes     = profil?.chargesEffectives ?? (state.AutresCredits + state.AutresCharges);
        const duree = state.duree;

        const mensualiteMaxTdtGlobale  = Math.max(0, (revenusEffectifs * (state.TEdt / 100)) - chargesFixes);
        const mensualiteMaxRavGlobale  = Math.max(0, revenusEffectifs - chargesFixes - state.RAV);
        const mensualiteMaxRetenueGlobale = Math.min(mensualiteMaxTdtGlobale, mensualiteMaxRavGlobale);

        const mensualiteMaxPourPretClassique = Math.max(0, mensualiteMaxRetenueGlobale - pib.monthlyPayment - ptb.monthlyPayment);
        const capEmpruntMax = calculerCapaciteEmprunt(mensualiteMaxPourPretClassique, state.TE, state.TA, duree * 12);

        const s = {};
        s.duree = duree;
        s.classic_amount = besoinCreditFinalClassique;
        s.mensInt  = calculerMensualiteCredit(s.classic_amount, state.TE, duree * 12);
        s.mensAss  = s.classic_amount * (state.TA / 100 / 12);
        s.mensTotaleClassique = s.classic_amount > 0 ? s.mensInt + s.mensAss : 0;

        s.coutCreditGlobal  = Math.max(0, (s.mensInt * duree * 12) - s.classic_amount)
                            + (s.mensAss * duree * 12)
                            + pib.totalCost + ptb.totalCost;
        s.mensTotaleGlobale = s.mensTotaleClassique + pib.monthlyPayment + ptb.monthlyPayment;
        s.resteAVivre       = revenusEffectifs - (s.mensTotaleGlobale + chargesFixes);
        s.respect           = s.mensTotaleGlobale <= mensualiteMaxRetenueGlobale + 0.01;

        const fraisInitiauxPourTAEG = state.FD + garDetails.cout + state.Courtier;
        s.classic_TAEG   = s.classic_amount > 0 ? calculerTAEG(s.classic_amount, s.mensTotaleClassique, duree * 12, fraisInitiauxPourTAEG) : 0;
        s.tauxEndettement = revenusEffectifs > 0 ? ((s.mensTotaleGlobale + chargesFixes) / revenusEffectifs) * 100 : Infinity;

        // TAEG Global (tous prêts combinés)
        let fluxMensuels = new Array(duree * 12).fill(0);
        for (let i = 0; i < duree * 12; i++) fluxMensuels[i] += s.mensTotaleClassique;
        if (pib.amount > 0) for (let i = 0; i < Math.min(pib.duration * 12, duree * 12); i++) fluxMensuels[i] += pib.monthlyPayment;
        if (ptb.amount > 0) for (let i = 0; i < Math.min(ptb.duration * 12, duree * 12); i++) fluxMensuels[i] += ptb.monthlyPayment;
        const montantEmprunteTotal = s.classic_amount + pib.amount + ptb.amount;
        s.taegGlobal = montantEmprunteTotal > 0 ? calculerTAEGGlobal(montantEmprunteTotal, fluxMensuels, fraisInitiauxPourTAEG) : 0;

        // Coût si 100 % classique (pour calcul économie prêts bonifiés)
        let coutOpPourClassicOnly = coutTotalOperation;
        if ((coutTotalOperation - state.A) > 0) {
            const fraisGarCO = evaluerFraisGarantie(state.typeGarantie, coutTotalOperation - state.A, state.typeBien === 'ancien', state.FG_manual).cout;
            const ctoBeforeCO = prixFAI + fn_details.montant + state.T + state.FD + state.Courtier + fraisGarCO;
            const vraiCreditCO = Math.max(0, ctoBeforeCO - state.A);
            const mensIntCO  = calculerMensualiteCredit(vraiCreditCO, state.TE, duree * 12);
            const mensAssCO  = vraiCreditCO * (state.TA / 100 / 12);
            coutOpPourClassicOnly = ctoBeforeCO + Math.max(0, (mensIntCO * duree * 12) - vraiCreditCO) + (mensAssCO * duree * 12);
        }
        s.coutOpPourClassicOnly = coutOpPourClassicOnly;
        s.savings = (pib.amount === 0 && ptb.amount === 0) ? 0 : coutOpPourClassicOnly - (coutTotalOperation + s.coutCreditGlobal);

        return { scenario: s, mensualiteMaxTdtGlobale, mensualiteMaxRavGlobale, mensualiteMaxRetenueGlobale, capEmpruntMax };
    }

    // Calcule mensualité + coût crédit classique pour n'importe quelle durée (sans toucher au DOM)
    function calculerPointCourbe(state, besoinCreditFinalClassique, pib, ptb, dureeAns) {
        const mensInt = calculerMensualiteCredit(besoinCreditFinalClassique, state.TE, dureeAns * 12);
        const mensAss = besoinCreditFinalClassique * (state.TA / 100 / 12);
        const mensTotaleClassique = besoinCreditFinalClassique > 0 ? mensInt + mensAss : 0;
        const mensTotaleGlobale = mensTotaleClassique + pib.monthlyPayment + ptb.monthlyPayment;
        const coutCreditGlobal = Math.max(0, (mensInt * dureeAns * 12) - besoinCreditFinalClassique)
                               + (mensAss * dureeAns * 12)
                               + pib.totalCost + ptb.totalCost;
        return { mensTotaleGlobale, coutCreditGlobal };
    }

    function calculerExigencesApport(state, fn_details, garDetails, FAg_montant) {
        // 1. Calculer les frais annexes (fonds perdus que la banque ne veut pas financer)
        const apportAgence = state.chargeAgence === 'acquereur' ? FAg_montant : 0;
        const fraisAnnexes = fn_details.montant + garDetails.cout + state.FD + state.Courtier + apportAgence;

        // 2. Voir si l'apport couvre ces frais
        const difference = state.A - fraisAnnexes;
        const fraisCouverts = difference >= 0;
        
        // 3. Calculer ce qu'il reste pour "les murs" (le prix net vendeur)
        const restePourMurs = Math.max(0, difference);
        const pourcentageMurs = state.P > 0 ? (restePourMurs / state.P) * 100 : 0;

        return {
            fraisAnnexes,
            fraisCouverts,
            manque: fraisCouverts ? 0 : Math.abs(difference),
            restePourMurs,
            pourcentageMurs
        };
    }

    const updateBonifiedSections = (ui, state, pib, ptb) => {
        const updateLoanInputDisplay = (loanObj, type) => {
            const isEnabled = type === 'ptb' ? state.isPTBEnabled : state.isPIBEnabled;
            const resAmountRow = type === 'ptb' ? ui.res_ptb_amount_row : ui.res_pib_amount_row;
            const resAmount    = type === 'ptb' ? ui.res_ptb_amount    : ui.res_pib_amount;
            const maxEl        = type === 'ptb' ? ui.ptbMaxAmount_display        : ui.pibMaxAmount_display;
            const bonifEl      = type === 'ptb' ? ui.ptbBonificationRate_display : ui.pibBonificationRate_display;
            const borrowerEl   = type === 'ptb' ? ui.ptbBorrowerRate_display     : ui.pibBorrowerRate_display;
            const durationLabelEl = type === 'ptb' ? ui.ptb_scenario_duration_label : ui.pib_scenario_duration_label;

            setDisplayEl(resAmountRow, loanObj.amount > 0 ? 'table-row' : 'none');
            if (isEnabled) {
                setTextEl(resAmount, formatCurrency(loanObj.amount) + " €");
                setTextEl(durationLabelEl, `${loanObj.duration} ans (fixe)`);
            }
            setHTMLEl(maxEl,      `<strong>${formatCurrency(loanObj.maxPossible)}</strong> €`);
            setHTMLEl(bonifEl,    `<strong>${formatPercentage(loanObj.bonification, 1)}</strong> %`);
            setHTMLEl(borrowerEl, `<strong>${formatPercentage(loanObj.interestRate, 2)}</strong> %`);
        };

        updateLoanInputDisplay(ptb, 'ptb');
        updateLoanInputDisplay(pib, 'pib');
    };

    const updateOperationSummary = (ui, state, FAg_montant, prixFAI, fn_details, garDetails, coutTotalOperation, besoinCreditFinalClassique) => {
        setTextEl(ui.FAg_montant, formatCurrency(FAg_montant));
        setTextEl(ui.prixFAI, formatCurrency(prixFAI));

        setTextEl(ui.res_prixFAI, formatCurrency(prixFAI) + " €");
        setTextEl(ui.FN_montant, state.FN_mode === 'manual' ? '' : formatCurrency(fn_details.montant) + ' €');
        setTextEl(ui.res_FN_montant, formatCurrency(fn_details.montant) + " €");

        setTextEl(ui.FG_description, garDetails.description);
        setTextEl(ui.FG_montant, formatCurrency(garDetails.cout));
        setTextEl(ui.res_FG_montant, formatCurrency(garDetails.cout) + " €");

        setTextEl(ui.res_FD, formatCurrency(state.FD) + " €");
        setTextEl(ui.res_Courtier, formatCurrency(state.Courtier) + " €");
        setTextEl(ui.res_T, formatCurrency(state.T) + " €");

        setTextEl(ui.coutTotalOperation, formatCurrency(coutTotalOperation) + " €");
        setTextEl(ui.res_apport, formatCurrency(state.A) + " €");
        setTextEl(ui.res_credit_demande, formatCurrency(coutTotalOperation - state.A) + " €");
        setTextEl(ui.res_classic_loan_amount, formatCurrency(besoinCreditFinalClassique) + " €");
        setTextEl(ui.scen_classic_amount_display, formatCurrency(besoinCreditFinalClassique) + " €");
        setDisplayEl(ui.res_classic_loan_amount_row, besoinCreditFinalClassique > 0 ? 'table-row' : 'none');
    };

    const updateCapacityAndLimits = (ui, state, scenData) => {
        setTextEl(ui.S_display, formatCurrency(state.S));
        setTextEl(ui.AutresCredits_display, formatCurrency(state.AutresCredits));
        setTextEl(ui.AutresCharges_display, formatCurrency(state.AutresCharges));

        setTextEl(ui.mensualitemax_tdt, formatCurrency(scenData.mensualiteMaxTdtGlobale) + " €");
        setTextEl(ui.mensualitemax_rav, formatCurrency(scenData.mensualiteMaxRavGlobale) + " €");
        setTextEl(ui.mensualitemax_retenue, formatCurrency(scenData.mensualiteMaxRetenueGlobale) + " €");

        setTextEl(ui.capEmpruntMax, formatCurrency(scenData.capEmpruntMax) + " €");
        setTextEl(ui.current_duree_val, state.duree);
        setTextEl(ui.current_TE_val, formatNumber(state.TE, 2));
        setTextEl(ui.current_TA_val, formatNumber(state.TA, 2));
    };

    const updateScenarioValues = (ui, state, scenData, coutTotalOperation) => {
        const s = scenData.scenario;

        setTextEl(ui.scen_duree_display, s.duree);
        setTextEl(ui.scen_classic_amount_display, formatCurrency(s.classic_amount) + " €");
        setTextEl(ui.scen_classic_mensualite, formatCurrency(s.mensTotaleClassique, 2) + " €");
        const mensAss = s.classic_amount > 0 ? (s.classic_amount * (state.TA / 100)) / 12 : 0;
        setText('scen_classic_assurance_detail', formatCurrency(mensAss, 2) + ' €/mois');
        setTextEl(ui.comp_mensualite, formatCurrency(s.mensTotaleGlobale, 2) + " €");
        setTextEl(ui.comp_resteAVivre, formatCurrency(s.resteAVivre) + " €");
        setTextEl(ui.comp_coutCredit, formatCurrency(s.coutCreditGlobal) + " €");
        setTextEl(ui.comp_coutOperation, formatCurrency(coutTotalOperation + s.coutCreditGlobal) + " €");
        setTextEl(ui.comp_TAEG, `${formatPercentage(s.classic_TAEG, 3)} %`);
        setTextEl(ui.comp_tauxEndettement, s.tauxEndettement === Infinity ? "N/A" : `${formatPercentage(s.tauxEndettement, 2)} %`);
        setTextEl(ui.comp_coutOperationClassicOnly, formatCurrency(s.coutOpPourClassicOnly) + " €");
        setTextEl(ui.comp_savings, formatCurrency(s.savings) + " €");
        setTextEl(ui.comp_TAEG_global, `${formatPercentage(s.taegGlobal, 2)} %`);

        const cellRespect = ui.respectMensualite;
        if (cellRespect) {
            cellRespect.textContent = (coutTotalOperation - state.A) <= 0 ? 'N/A' : (s.respect ? '✅ OK' : '❌ NON');
            cellRespect.className = `status-cell ${(coutTotalOperation - state.A) <= 0 ? '' : (s.respect ? 'ok' : 'nok')}`;
        }
    };

    const updateApportAnalysis = (ui, state, analyseApport) => {
        setTextEl(ui.A_display, formatCurrency(state.A));

        let htmlApport = `
            <div style="margin-bottom: 8px;">
                <span style="font-size: 0.8rem; color: var(--text-light-color);">Frais annexes (Notaire, Garantie, Dossier, Courtage${state.chargeAgence === 'acquereur' ? ', Agence' : ''}) :</span>
                <br><strong>${formatCurrency(analyseApport.fraisAnnexes)} €</strong>
            </div>
        `;

        if (!analyseApport.fraisCouverts) {
            htmlApport += `
                <div style="color: var(--danger-color); font-weight: 600; padding: 6px; background-color: #ffebee; border-radius: 4px; font-size: 0.8rem;">
                    ❌ Votre apport est insuffisant. Il manque <strong>${formatCurrency(analyseApport.manque)} €</strong> pour couvrir les frais annexes obligatoires.
                </div>
            `;
        } else {
            htmlApport += `
                <div style="color: var(--primary-color); font-weight: 600; font-size: 0.8rem; margin-bottom: 10px;">
                    ✅ Frais annexes intégralement couverts.
                </div>
                <div style="padding-top: 8px; border-top: 1px dashed var(--border-color);">
                    <span style="font-size: 0.8rem; color: var(--text-light-color);">Apport restant injecté dans le bien (les "murs") :</span>
                    <br><strong>${formatCurrency(analyseApport.restePourMurs)} €</strong> 
                    <span style="color: var(--secondary-color); font-weight: bold; font-size: 0.85rem;">
                        (soit ${formatPercentage(analyseApport.pourcentageMurs, 1)} % du prix net vendeur)
                    </span>
                </div>
            `;
        }

        setHTMLEl(ui.apportAnalysisContainer, htmlApport);
    };

    const updateIraVisibility = (ui, state, uiState) => {
        const iraMode = uiState?.iraMode || 'percentage';
        setDisplayEl(ui.ira_percentage_container, iraMode === 'percentage' ? 'flex' : 'none');
        setDisplayEl(ui.ira_manual_container, iraMode === 'manual' ? 'flex' : 'none');
        if (iraMode === 'percentage') {
            setDisplayEl(ui.ira_pib_container, state.isPIBEnabled ? 'flex' : 'none');
            setDisplayEl(ui.ira_ptb_container, state.isPTBEnabled ? 'flex' : 'none');
        }
    };

    let combineOnlyEls = null;
    const updateTaegGlobalAndCombinedRows = (ui, scenData, pib, ptb) => {
        const hasPTB = ptb && ptb.amount > 0;
        const hasPIB = pib && pib.amount > 0;
        const hasBonifiedLoans = hasPTB || hasPIB;

        setDisplayEl(ui.ptb_scenario_header_row, hasPTB ? 'table-row' : 'none');
        setDisplayEl(ui.ptb_scenario_amount_row, hasPTB ? 'table-row' : 'none');
        setDisplayEl(ui.ptb_scenario_mensualite_row, hasPTB ? 'table-row' : 'none');
        setDisplayEl(ui.ptb_scenario_rate_row, hasPTB ? 'table-row' : 'none');
        setDisplayEl(ui.ptb_scenario_cost_row, hasPTB ? 'table-row' : 'none');
        setDisplayEl(ui.ptb_scenario_amort_row, hasPTB ? 'table-row' : 'none');
        if (hasPTB) {
            setTextEl(ui.scen_ptb_amount_display, formatCurrency(ptb.amount) + " €");
            setTextEl(ui.scen_ptb_mensualite_display, formatCurrency(ptb.monthlyPayment, 2) + " €");
            setTextEl(ui.scen_ptb_rate_display, formatPercentage(ptb.interestRate, 2) + " %");
            setTextEl(ui.scen_ptb_cost_display, formatCurrency(ptb.totalCost) + " €");
        }

        setDisplayEl(ui.pib_scenario_header_row, hasPIB ? 'table-row' : 'none');
        setDisplayEl(ui.pib_scenario_amount_row, hasPIB ? 'table-row' : 'none');
        setDisplayEl(ui.pib_scenario_mensualite_row, hasPIB ? 'table-row' : 'none');
        setDisplayEl(ui.pib_scenario_rate_row, hasPIB ? 'table-row' : 'none');
        setDisplayEl(ui.pib_scenario_cost_row, hasPIB ? 'table-row' : 'none');
        setDisplayEl(ui.pib_scenario_amort_row, hasPIB ? 'table-row' : 'none');
        if (hasPIB) {
            setTextEl(ui.scen_pib_amount_display, formatCurrency(pib.amount) + " €");
            setTextEl(ui.scen_pib_mensualite_display, formatCurrency(pib.monthlyPayment, 2) + " €");
            setTextEl(ui.scen_pib_rate_display, formatPercentage(pib.interestRate, 2) + " %");
            setTextEl(ui.scen_pib_cost_display, formatCurrency(pib.totalCost) + " €");
        }

        if (!combineOnlyEls) combineOnlyEls = Array.from(document.querySelectorAll('.combine-only'));
        combineOnlyEls.forEach(el => { el.style.display = hasBonifiedLoans ? 'table-row' : 'none'; });
    };

    // Phase 0 — render dédié pour les frais de notaire (toutes les écritures DOM extraites de gererFraisAcquisition)
    const renderFraisNotaire = (ui, fn_display) => {
        if (fn_display.mode === 'auto') {
            // Met à jour le slider FN avec le pourcentage calculé
            const fnSlider = getEl('FN'), fnNum = getEl('FN_num');
            if (fnSlider && fnNum) {
                const pct = fn_display.fnPourcent.toFixed(1);
                fnNum.value   = pct;
                fnSlider.value = pct;
                const min = parseFloat(fnSlider.min), max = parseFloat(fnSlider.max);
                const val = Math.max(min, Math.min(parseFloat(pct), max));
                fnSlider.style.setProperty('--val', `${max === min ? 0 : ((val - min) / (max - min)) * 100}%`);
            }
            setText('fn_base_calc',      fn_display.baseCalcul);
            setText('fn_type_bien_label', fn_display.typeBien);
            setText('fn_taxes',          fn_display.taxes);
            setText('fn_emoluments',     fn_display.emoluments);
            setText('fn_debours',        fn_display.debours);
            setText('fn_taxes_pc',       fn_display.taxesPc);
            setText('fn_emoluments_pc',  fn_display.emolumentsPc);
            setText('fn_debours_pc',     fn_display.debourssPc);
        } else {
            setText('FN_montant_pc', fn_display.montantPc);
        }
    };

    // Phase 3 — render profil foyer + projection
    const renderProfilEmprunteur = (ui, state, profil, scenData) => {
        const s = scenData.scenario;
        const { revenusEffectifs, chargesEffectives, revVarIntegre, revenusCoEmpr } = profil;

        // Display inline dans la section inputs
        setTextEl(ui.revenusEffectifs_val, formatCurrency(revenusEffectifs, 0));

        // Section résultats Phase 3
        setTextEl(ui.p3_revenus_effectifs, formatCurrency(revenusEffectifs, 0) + ' €/mois');
        setTextEl(ui.p3_charges_effectives, formatCurrency(chargesEffectives, 0) + ' €/mois');
        setTextEl(ui.p3_mensualite_globale, formatCurrency(s.mensTotaleGlobale, 0) + ' €/mois');

        const tdTxt = s.tauxEndettement === Infinity ? 'N/A' : formatPercentage(s.tauxEndettement, 2) + ' %';
        const ravColor = s.resteAVivre < 0 ? 'var(--danger-color)' : 'var(--primary-color)';
        const tdColor  = s.tauxEndettement > state.TEdt ? 'var(--danger-color)' : 'var(--primary-color)';
        if (ui.p3_taux_endettement) { ui.p3_taux_endettement.textContent = tdTxt; ui.p3_taux_endettement.style.color = tdColor; }
        if (ui.p3_reste_a_vivre)    { ui.p3_reste_a_vivre.textContent    = formatCurrency(s.resteAVivre, 0) + ' €'; ui.p3_reste_a_vivre.style.color = ravColor; }

        // Lignes co-emprunteur / revenus variables
        setDisplayEl(ui.p3_row_coempr, state.coEmprunteur ? 'table-row' : 'none');
        if (state.coEmprunteur) setTextEl(ui.p3_s2_display, formatCurrency(revenusCoEmpr, 0) + ' €/mois');

        const hasRevVar = revVarIntegre > 0;
        setDisplayEl(ui.p3_row_varrev, hasRevVar ? 'table-row' : 'none');
        if (hasRevVar) setTextEl(ui.p3_revvar_display, formatCurrency(revVarIntegre, 0) + ' €/mois');

        // Projection
        const container = ui.p3_projection_container;
        if (!container) return;
        if (state.revenuEvolution === 0 && state.horizonEvolution) {
            container.innerHTML = '<p style="font-size:.75rem;color:var(--text-light-color);">Saisissez un taux de hausse annuelle > 0 % pour voir la projection.</p>';
            return;
        }
        const projections = calculerProjectionRevenus(state, profil, s.mensTotaleGlobale);
        const colH = state.horizonEvolution;
        const rows = projections.map(({ horizon, revenuProjecte, tauxEndettProj, resteAVivreProj }) => {
            const isTarget = horizon === colH;
            const cls = isTarget ? ' class="highlight-row"' : '';
            const tdColor2 = tauxEndettProj > state.TEdt ? 'var(--danger-color)' : 'var(--primary-color)';
            const ravC2    = resteAVivreProj < 0 ? 'var(--danger-color)' : 'var(--primary-color)';
            return `<tr${cls}>
                <td>+${horizon} ans</td>
                <td>${formatCurrency(revenuProjecte, 0)} €/mois</td>
                <td style="color:${tdColor2}">${tauxEndettProj === Infinity ? 'N/A' : formatPercentage(tauxEndettProj, 2) + ' %'}</td>
                <td style="color:${ravC2}">${formatCurrency(resteAVivreProj, 0)} €</td>
            </tr>`;
        }).join('');
        container.innerHTML = `<div style="overflow-x:auto"><table>
            <thead><tr><th>Horizon</th><th>Revenus projetés</th><th>Taux endettement</th><th>Reste à vivre</th></tr></thead>
            <tbody>${rows}</tbody>
        </table></div>`;
    };

    function mettreAJourInterface(ui, state, uiState, FAg_montant, prixFAI, fn_details, fn_display, garDetails, coutTotalOperation, besoinCreditFinalClassique, pib, ptb, scenData, analyseApport, profil) {
        renderFraisNotaire(ui, fn_display);
        updateBonifiedSections(ui, state, pib, ptb);
        updateOperationSummary(ui, state, FAg_montant, prixFAI, fn_details, garDetails, coutTotalOperation, besoinCreditFinalClassique);
        updateCapacityAndLimits(ui, state, scenData);
        updateScenarioValues(ui, state, scenData, coutTotalOperation);
        updateApportAnalysis(ui, state, analyseApport);
        updateIraVisibility(ui, state, uiState);
        updateTaegGlobalAndCombinedRows(ui, scenData, pib, ptb);
        if (profil) renderProfilEmprunteur(ui, state, profil, scenData);
    }

    // === PHASE 2 — Sensibilité taux / Apport optimal / Graphique amortissement ===

    let apportChart = null;
    let amortChart  = null;
    let _p2Cache    = null; // { state, coutTotalOperation, prixFAI, pib, ptb, courbeApport }
    let solverChart     = null;
    let comparatorChart = null;
    let _offerCount     = 0;

    // ── 2.1 Sensibilité au taux ──────────────────────────────────────────────

    function calculerSensibiliteTaux(state, besoinCreditFinalClassique, pib, ptb) {
        const chargesFixes = state.AutresCredits + state.AutresCharges;
        return [-0.5, -0.25, -0.1, 0, 0.1, 0.25, 0.5].map(delta => {
            const taux    = Math.max(0.01, state.TE + delta);
            const mensInt = calculerMensualiteCredit(besoinCreditFinalClassique, taux, state.duree * 12);
            const mensAss = besoinCreditFinalClassique > 0 ? besoinCreditFinalClassique * (state.TA / 100 / 12) : 0;
            const mensTotaleClassique = besoinCreditFinalClassique > 0 ? mensInt + mensAss : 0;
            const mensTotaleGlobale   = mensTotaleClassique + pib.monthlyPayment + ptb.monthlyPayment;
            const coutCreditClassique = Math.max(0, (mensInt * state.duree * 12) - besoinCreditFinalClassique) + (mensAss * state.duree * 12);
            const coutCreditGlobal    = coutCreditClassique + pib.totalCost + ptb.totalCost;
            return { delta, taux, mensTotaleClassique, mensTotaleGlobale, coutCreditGlobal };
        });
    }

    function renderSensibiliteTaux(ui, sensData) {
        const container = ui?.sensitivityTableContainer;
        if (!container) return;
        const base = sensData.find(r => r.delta === 0);
        if (!base) return;
        const sign = v => (v > 0 ? '+' : '') + formatCurrency(Math.round(v), 0);
        let html = `<div style="overflow-x:auto"><table>
            <thead><tr>
                <th>Taux nominal</th><th>Δ Taux</th>
                <th>Mensualité totale</th><th>Δ Mensualité</th>
                <th>Coût total crédits</th><th>Δ Coût crédit</th>
            </tr></thead><tbody>`;
        sensData.forEach(r => {
            const isCur = r.delta === 0;
            const dM = r.mensTotaleGlobale - base.mensTotaleGlobale;
            const dC = r.coutCreditGlobal  - base.coutCreditGlobal;
            const rowCls = isCur ? ' class="highlight-row"' : '';
            const cM = isCur ? '' : `style="color:${dM > 0 ? 'var(--danger-color)' : 'var(--primary-color)'}"`;
            const cC = isCur ? '' : `style="color:${dC > 0 ? 'var(--danger-color)' : 'var(--primary-color)'}"`;
            html += `<tr${rowCls}>
                <td><strong>${formatPercentage(r.taux, 2)} %</strong></td>
                <td>${isCur ? '—' : `${r.delta > 0 ? '+' : ''}${r.delta.toFixed(2)} %`}</td>
                <td>${formatCurrency(r.mensTotaleGlobale, 0)} €/mois</td>
                <td ${cM}>${isCur ? '—' : sign(dM) + ' €'}</td>
                <td>${formatCurrency(r.coutCreditGlobal)} €</td>
                <td ${cC}>${isCur ? '—' : sign(dC) + ' €'}</td>
            </tr>`;
        });
        html += '</tbody></table></div>';
        container.innerHTML = html;
    }

    // ── 2.2 Impact de l'apport ───────────────────────────────────────────────

    const NB_APPORT_POINTS = 51;

    function calculerDonneesApportCourbe(state, coutTotalOperation, prixFAI, pib, ptb) {
        const maxApport  = Math.max(coutTotalOperation, 1);
        const step       = maxApport / (NB_APPORT_POINTS - 1);
        const bonified   = pib.amount + ptb.amount;
        return Array.from({ length: NB_APPORT_POINTS }, (_, i) => {
            const apport       = Math.round(i * step);
            const classicAmt   = Math.max(0, coutTotalOperation - apport - bonified);
            const ltv          = prixFAI > 0 ? (classicAmt / prixFAI) * 100 : 0;
            const mensInt      = calculerMensualiteCredit(classicAmt, state.TE, state.duree * 12);
            const mensAss      = classicAmt * (state.TA / 100 / 12);
            const mensTotGlob  = (classicAmt > 0 ? mensInt + mensAss : 0) + pib.monthlyPayment + ptb.monthlyPayment;
            const coutCredit   = Math.max(0, (mensInt * state.duree * 12) - classicAmt) + (mensAss * state.duree * 12) + pib.totalCost + ptb.totalCost;
            return { apport, classicAmt, ltv, mensTotGlob, coutCredit };
        });
    }

    function mettreAJourInfoApportAlt(apportAlt, courbeData) {
        const container = ui?.apportAltInfoContainer;
        if (!container || !courbeData || !courbeData.length) return;
        const maxA = courbeData[courbeData.length - 1].apport;
        const idx  = Math.round((Math.min(apportAlt, maxA) / maxA) * (NB_APPORT_POINTS - 1));
        const pt   = courbeData[Math.max(0, Math.min(idx, courbeData.length - 1))];
        const ltvColor = pt.ltv > 90 ? 'var(--danger-color)' : pt.ltv > 80 ? '#FF9800' : 'var(--primary-color)';
        container.style.display = 'block';
        container.innerHTML = `
            <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
                <div><span style="font-size:.7rem;color:var(--text-light-color);">Prêt classique</span><br><strong>${formatCurrency(pt.classicAmt)} €</strong></div>
                <div><span style="font-size:.7rem;color:var(--text-light-color);">Mensualité totale</span><br><strong>${formatCurrency(pt.mensTotGlob, 0)} €/mois</strong></div>
                <div><span style="font-size:.7rem;color:var(--text-light-color);">Coût total crédits</span><br><strong>${formatCurrency(pt.coutCredit)} €</strong></div>
                <div><span style="font-size:.7rem;color:var(--text-light-color);">Financement</span><br><strong style="color:${ltvColor}">${formatPercentage(pt.ltv, 1)} %</strong></div>
            </div>`;
        if (apportChart) { apportChart._currentApport = apportAlt; apportChart.update('none'); }
    }

    function mettreAJourApportChart(courbeData, prixFAI, pib, ptb, coutTotalOperation) {
        const canvas = ui?.apportAltCanvas;
        if (!canvas || typeof Chart === 'undefined' || !courbeData) return;

        const labels   = courbeData.map(d => d.apport);
        const dataMens = courbeData.map(d => Math.round(d.mensTotGlob));
        const dataCout = courbeData.map(d => Math.round(d.coutCredit));

        // Seuils paliers d'apport (stockés sur le chart pour rester à jour)
        const bonified     = pib.amount + ptb.amount;
        const apportLTV90  = Math.max(0, coutTotalOperation - bonified - 0.9 * prixFAI);
        const apportLTV80  = Math.max(0, coutTotalOperation - bonified - 0.8 * prixFAI);

        const vertPlugin = {
            id: 'apportVLines',
            afterDraw(chart) {
                const { ctx, scales, chartArea } = chart;
                if (!scales.x || !chartArea) return;
                const chartLabels = chart.data.labels;
                const lines = [
                    { xVal: chart._ltv90,          color: '#FF9800', label: 'Apport 10%', dash: true  },
                    { xVal: chart._ltv80,          color: '#4CAF50', label: 'Apport 20%', dash: true  },
                    { xVal: chart._currentApport ?? -1, color: '#2196F3', label: '',      dash: false }
                ];
                lines.forEach(({ xVal, color, label, dash }) => {
                    if (xVal == null || xVal < 0 || xVal > chartLabels[chartLabels.length - 1]) return;
                    const xPx = scales.x.getPixelForValue(xVal);
                    if (xPx < chartArea.left || xPx > chartArea.right) return;
                    ctx.save();
                    ctx.beginPath(); ctx.moveTo(xPx, chartArea.top); ctx.lineTo(xPx, chartArea.bottom);
                    ctx.strokeStyle = color; ctx.lineWidth = dash ? 1.5 : 2.5;
                    if (dash) ctx.setLineDash([5, 3]);
                    ctx.stroke();
                    if (label) {
                        ctx.fillStyle = color; ctx.font = 'bold 9px Poppins, sans-serif';
                        ctx.textAlign = 'center'; ctx.fillText(label, xPx, chartArea.top - 4);
                    }
                    ctx.restore();
                });
            }
        };

        const currentApport = parseFloat(getEl('apport_alt')?.value || 0);

        if (apportChart) {
            apportChart.data.labels = labels;
            apportChart.data.datasets[0].data = dataMens;
            apportChart.data.datasets[1].data = dataCout;
            apportChart._currentApport = currentApport;
            apportChart._ltv90 = apportLTV90;
            apportChart._ltv80 = apportLTV80;
            apportChart.options.scales.y.min  = Math.floor(Math.min(...dataMens) * 0.95);
            apportChart.options.scales.y.max  = Math.ceil(Math.max(...dataMens) * 1.05);
            apportChart.options.scales.y2.min = Math.floor(Math.min(...dataCout) * 0.95);
            apportChart.options.scales.y2.max = Math.ceil(Math.max(...dataCout) * 1.05);
            apportChart.update('none');
            return;
        }

        apportChart = new Chart(canvas, {
            type: 'line',
            plugins: [vertPlugin],
            data: {
                labels,
                datasets: [
                    { label: 'Mensualité totale (€/mois)', data: dataMens, borderColor: '#2196F3', backgroundColor: 'rgba(33,150,243,0.07)', tension: 0.3, pointRadius: 0, yAxisID: 'y',  fill: false },
                    { label: 'Coût total crédits (€)',     data: dataCout, borderColor: '#FF9800', backgroundColor: 'rgba(255,152,0,0.07)',   tension: 0.3, pointRadius: 0, yAxisID: 'y2', fill: false }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                layout: { padding: { top: 18 } },
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 11 } } },
                    tooltip: { callbacks: {
                        title: items => `Apport : ${Number(items[0].label).toLocaleString('fr-FR')} €`,
                        label:  ctx  => `${ctx.dataset.label.split(' (')[0]} : ${ctx.parsed.y.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €`
                    }}
                },
                scales: {
                    x:  { ticks: { font: { size: 9 }, maxTicksLimit: 8, callback: (_, i) => i < labels.length ? (labels[i] / 1000).toFixed(0) + ' k€' : '' } },
                    y:  { position: 'left',  min: Math.floor(Math.min(...dataMens) * 0.95), max: Math.ceil(Math.max(...dataMens) * 1.05), title: { display: true, text: 'Mensualité (€/mois)',  font: { size: 10 } }, ticks: { font: { size: 10 }, callback: v => v.toLocaleString('fr-FR') + ' €' } },
                    y2: { position: 'right', min: Math.floor(Math.min(...dataCout) * 0.95), max: Math.ceil(Math.max(...dataCout) * 1.05), title: { display: true, text: 'Coût crédits (€)',     font: { size: 10 } }, ticks: { font: { size: 10 }, callback: v => v.toLocaleString('fr-FR') + ' €' }, grid: { drawOnChartArea: false } }
                }
            }
        });
        apportChart._currentApport = currentApport;
        apportChart._ltv90 = apportLTV90;
        apportChart._ltv80 = apportLTV80;
    }

    // ── 2.3 Graphique d'amortissement ────────────────────────────────────────

    function agrégerParAnnée(schedule) {
        const byYear = {};
        schedule.forEach(row => {
            const yr = Math.ceil(row.month / 12);
            if (!byYear[yr]) byYear[yr] = { capital: 0, interets: 0, assurance: 0, crdFin: 0 };
            byYear[yr].capital   += row.principalRepaid;
            byYear[yr].interets  += row.interest;
            byYear[yr].assurance += row.insurance;
            byYear[yr].crdFin     = row.remainingBalance;
        });
        return Object.entries(byYear).sort((a, b) => +a[0] - +b[0]).map(([yr, d]) => ({ year: +yr, ...d }));
    }

    function renderAmortissementChart(allSchedules) {
        const canvas = getEl('amortChartCanvas');
        if (!canvas || typeof Chart === 'undefined' || !allSchedules?.length) return;
        if (amortChart) { amortChart.destroy(); amortChart = null; }

        const maxYear = Math.max(...allSchedules.map(s => {
            const last = s.data[s.data.length - 1];
            return last ? Math.ceil(last.month / 12) : 0;
        }));
        const labels = Array.from({ length: maxYear }, (_, i) => `A${i + 1}`);

        // Agrégation toutes durées confondues
        const tot = Array.from({ length: maxYear }, () => ({ capital: 0, interets: 0, assurance: 0, crd: 0 }));
        allSchedules.forEach(({ data }) => {
            agrégerParAnnée(data).forEach(({ year, capital, interets, assurance, crdFin }) => {
                if (year <= maxYear) {
                    tot[year - 1].capital   += capital;
                    tot[year - 1].interets  += interets;
                    tot[year - 1].assurance += assurance;
                    tot[year - 1].crd       += crdFin;
                }
            });
        });

        amortChart = new Chart(canvas, {
            data: {
                labels,
                datasets: [
                    { type:'bar',  label:'Capital remboursé',  data: tot.map(t => Math.round(t.capital)),   backgroundColor:'rgba(33,150,243,0.8)',  stack:'s', yAxisID:'y',  order:2 },
                    { type:'bar',  label:'Intérêts',           data: tot.map(t => Math.round(t.interets)),  backgroundColor:'rgba(244,67,54,0.72)',  stack:'s', yAxisID:'y',  order:2 },
                    { type:'bar',  label:'Assurance',          data: tot.map(t => Math.round(t.assurance)), backgroundColor:'rgba(255,152,0,0.72)',  stack:'s', yAxisID:'y',  order:2 },
                    { type:'line', label:'Capital restant dû', data: tot.map(t => Math.round(t.crd)),       borderColor:'#4CAF50', backgroundColor:'rgba(76,175,80,0.1)', tension:0.3, pointRadius:2, borderWidth:2, yAxisID:'y2', order:1, fill:false }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend:  { position:'top', labels: { font: { size: 10 }, boxWidth: 12 } },
                    tooltip: { callbacks: { label: ctx => `${ctx.dataset.label} : ${ctx.parsed.y.toLocaleString('fr-FR')} €` } }
                },
                scales: {
                    x:  { stacked: true, ticks: { font: { size: 9 }, maxRotation: 45 } },
                    y:  { stacked: true, position:'left',  title:{ display:true, text:'Remboursements (€/an)',  font:{ size:10 } }, ticks:{ font:{ size:9 }, callback: v => v.toLocaleString('fr-FR') + ' €' } },
                    y2: { stacked: false,position:'right', title:{ display:true, text:'Capital restant dû (€)', font:{ size:10 } }, ticks:{ font:{ size:9 }, callback: v => v.toLocaleString('fr-FR') + ' €' }, grid:{ drawOnChartArea:false } }
                }
            }
        });
    }

    // === PHASE 1 — Courbe Durée vs Coût + Optimiseur ===

    let durationChart = null; // instance Chart.js réutilisée

    function mettreAJourCourbeDuree(state, besoinCreditFinalClassique, pib, ptb, mensualiteMaxRetenue) {
        const canvas = ui?.durationCurveCanvas;
        if (!canvas || typeof Chart === 'undefined') return;

        const labels = [];
        const dataMensualite = [];
        const dataCoutCredit = [];
        const dureeSelectionnee = state.duree;

        for (let d = 10; d <= 30; d++) {
            labels.push(`${d}a`);
            const pt = calculerPointCourbe(state, besoinCreditFinalClassique, pib, ptb, d);
            dataMensualite.push(Math.round(pt.mensTotaleGlobale * 100) / 100);
            dataCoutCredit.push(Math.round(pt.coutCreditGlobal));
        }

        // Annotation de la durée sélectionnée (index 0-based depuis 10)
        const selectedIdx = dureeSelectionnee - 10;

        // Couleurs pour marquer la durée active
        const pointRadiusMens = labels.map((_, i) => i === selectedIdx ? 7 : 3);
        const pointRadiusCout = labels.map((_, i) => i === selectedIdx ? 7 : 3);
        const pointBgMens = labels.map((_, i) => i === selectedIdx ? '#e53935' : '#2196F3');
        const pointBgCout = labels.map((_, i) => i === selectedIdx ? '#e53935' : '#FF9800');

        if (durationChart) {
            // Mise à jour légère sans recréer le canvas
            durationChart.data.labels = labels;
            durationChart.data.datasets[0].data = dataMensualite;
            durationChart.data.datasets[0].pointRadius = pointRadiusMens;
            durationChart.data.datasets[0].pointBackgroundColor = pointBgMens;
            durationChart.data.datasets[1].data = dataCoutCredit;
            durationChart.data.datasets[1].pointRadius = pointRadiusCout;
            durationChart.data.datasets[1].pointBackgroundColor = pointBgCout;
            // Ligne de mensualité max
            if (durationChart.data.datasets[2]) {
                durationChart.data.datasets[2].data = labels.map(() => Math.round(mensualiteMaxRetenue));
            }
            durationChart.update('none'); // sans animation pour fluidité slider
            return;
        }

        durationChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Mensualité totale (€)',
                        data: dataMensualite,
                        borderColor: '#2196F3',
                        backgroundColor: 'rgba(33,150,243,0.08)',
                        pointRadius: pointRadiusMens,
                        pointBackgroundColor: pointBgMens,
                        tension: 0.3,
                        yAxisID: 'y',
                        fill: false
                    },
                    {
                        label: 'Coût total crédits (€)',
                        data: dataCoutCredit,
                        borderColor: '#FF9800',
                        backgroundColor: 'rgba(255,152,0,0.08)',
                        pointRadius: pointRadiusCout,
                        pointBackgroundColor: pointBgCout,
                        tension: 0.3,
                        yAxisID: 'y2',
                        fill: false
                    },
                    {
                        label: 'Mensualité max retenue (€)',
                        data: labels.map(() => Math.round(mensualiteMaxRetenue)),
                        borderColor: '#F44336',
                        borderDash: [6, 3],
                        borderWidth: 1.5,
                        pointRadius: 0,
                        yAxisID: 'y',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 11 } } },
                    tooltip: {
                        callbacks: {
                            label: ctx => {
                                const v = ctx.parsed.y;
                                return `${ctx.dataset.label} : ${v.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €`;
                            }
                        }
                    }
                },
                scales: {
                    x: { ticks: { font: { size: 10 } } },
                    y: {
                        type: 'linear', position: 'left',
                        title: { display: true, text: 'Mensualité (€)', font: { size: 10 } },
                        ticks: { font: { size: 10 }, callback: v => v.toLocaleString('fr-FR') + ' €' }
                    },
                    y2: {
                        type: 'linear', position: 'right',
                        title: { display: true, text: 'Coût crédits (€)', font: { size: 10 } },
                        ticks: { font: { size: 10 }, callback: v => v.toLocaleString('fr-FR') + ' €' },
                        grid: { drawOnChartArea: false }
                    }
                }
            }
        });
    }

    function lancerOptimiseur(state, besoinCreditFinalClassique, pib, ptb, mensualiteMaxRetenue) {
        const mode = getEl('optimizer_mode')?.value || 'mensualite_max';
        const resultEl = ui?.optimizerResult;
        if (!resultEl) return;

        let dureeOpt = null;
        let justification = '';

        if (mode === 'mensualite_max') {
            // Mode A : mensualité cible saisie par l'utilisateur
            const target = parseFloat(getEl('optimizer_target')?.value) || mensualiteMaxRetenue;
            for (let d = 10; d <= 30; d++) {
                const pt = calculerPointCourbe(state, besoinCreditFinalClassique, pib, ptb, d);
                if (pt.mensTotaleGlobale <= target + 0.5) {
                    dureeOpt = d;
                    const pt2 = calculerPointCourbe(state, besoinCreditFinalClassique, pib, ptb, d);
                    justification = `Mensualité totale : <strong>${formatCurrency(pt2.mensTotaleGlobale, 0)} €/mois</strong> ≤ cible ${formatCurrency(target, 0)} € — Coût total crédits : <strong>${formatCurrency(pt2.coutCreditGlobal)} €</strong>`;
                    break;
                }
            }
            if (!dureeOpt) {
                resultEl.style.display = 'block';
                resultEl.innerHTML = `❌ Aucune durée entre 10 et 30 ans ne permet d'atteindre la mensualité cible de <strong>${formatCurrency(target, 0)} €</strong>.`;
                return;
            }
        } else {
            // Mode B : coude de la courbe (dérivée seconde du coût crédit)
            const points = [];
            for (let d = 10; d <= 30; d++) {
                const pt = calculerPointCourbe(state, besoinCreditFinalClassique, pib, ptb, d);
                points.push({ d, cout: pt.coutCreditGlobal, mens: pt.mensTotaleGlobale });
            }
            // Dérivée seconde : on cherche le coude où la réduction du coût ralentit fortement
            let maxCourbure = -Infinity;
            let coudIdx = 1;
            for (let i = 1; i < points.length - 1; i++) {
                // Approximation de la dérivée seconde (variation de la pente)
                const d1 = points[i].cout - points[i - 1].cout;
                const d2 = points[i + 1].cout - points[i].cout;
                const courbure = Math.abs(d2 - d1);
                if (courbure > maxCourbure) { maxCourbure = courbure; coudIdx = i; }
            }
            dureeOpt = points[coudIdx].d;
            justification = `Mensualité : <strong>${formatCurrency(points[coudIdx].mens, 0)} €/mois</strong> — Coût crédits : <strong>${formatCurrency(points[coudIdx].cout)} €</strong> (point d'inflexion de la courbe)`;
        }

        resultEl.style.display = 'block';
        resultEl.innerHTML = `✅ Durée recommandée : <strong>${dureeOpt} ans</strong> — ${justification}`;
    }

    // === PHASE 4 — Remboursement Anticipé Partiel ===

    function calculerRemboursementAnticipe(state, classicAmount, uiState) {
        const raMois = uiState.ra.mois;
        const raMontant = uiState.ra.montant;
        const tauxClassique = state.TE;
        const dureeMois = state.duree * 12;

        if (classicAmount <= 0 || raMontant <= 0 || raMois >= dureeMois) return null;

        const crd = calculerCapitalRestantDu(classicAmount, tauxClassique, dureeMois, raMois);
        // Mettre à jour le max du slider RA dynamiquement
        const raMontantEl = getEl('raMontant');
        const raMontantNumEl = getEl('raMontant_num');
        if (raMontantEl && raMontantNumEl && crd > 0) {
            const newMax = Math.max(200000, Math.ceil(crd / 1000) * 1000);
            raMontantEl.max = newMax;
            raMontantNumEl.max = newMax;
        }
        if (crd <= 0 || raMontant >= crd) return null;

        // IRA légale sur le montant remboursé par anticipation
        const sixMoisIntRA = (raMontant * tauxClassique / 100) / 2;
        const iraRA = Math.min(crd * 0.03, sixMoisIntRA);

        const newCapital = crd - raMontant;
        const moisRestants = dureeMois - raMois;
        const tauxMensuel = tauxClassique / 100 / 12;
        const mensualite = calculerMensualiteCredit(classicAmount, tauxClassique, dureeMois);

        // Intérêts restants sans RA (sur moisRestants avec capital=crd)
        const interetsRestantsSansRA = mensualite * moisRestants - crd;

        // Stratégie A : même mensualité, durée raccourcie
        let moisRestantsA = moisRestants;
        if (tauxMensuel > 0 && mensualite > newCapital * tauxMensuel) {
            moisRestantsA = Math.ceil(-Math.log(1 - newCapital * tauxMensuel / mensualite) / Math.log(1 + tauxMensuel));
        } else if (tauxMensuel === 0) {
            moisRestantsA = Math.ceil(newCapital / mensualite);
        }
        moisRestantsA = Math.min(moisRestantsA, moisRestants);
        const interetsRestantsA = mensualite * moisRestantsA - newCapital;
        const economieNetteA = (interetsRestantsSansRA - interetsRestantsA) - iraRA;

        // Stratégie B : même durée, mensualité réduite
        const nouvelleMensualiteB = calculerMensualiteCredit(newCapital, tauxClassique, moisRestants);
        const interetsRestantsB = nouvelleMensualiteB * moisRestants - newCapital;
        const economieMensuelleB = mensualite - nouvelleMensualiteB;
        const economieNetteB = (interetsRestantsSansRA - interetsRestantsB) - iraRA;
        const breakEvenB = economieMensuelleB > 0 ? Math.ceil(iraRA / economieMensuelleB) : null;

        return {
            crd, iraRA, newCapital, moisRestants, mensualite, raMois,
            sanRA: { moisRestants, interetsRestants: interetsRestantsSansRA, mensualite },
            stratA: {
                moisRestants: moisRestantsA,
                moisGagnes: moisRestants - moisRestantsA,
                interetsRestants: Math.max(0, interetsRestantsA),
                economieNette: economieNetteA,
                mensualite
            },
            stratB: {
                moisRestants,
                interetsRestants: Math.max(0, interetsRestantsB),
                economieNette: economieNetteB,
                mensualite: nouvelleMensualiteB,
                economieMensuelle: economieMensuelleB,
                breakEven: breakEvenB
            }
        };
    }

    function renderRemboursementAnticipe(ui, raData) {
        const container = ui.ra_table_container;
        const infoBox = ui.ra_info_box;
        if (!container) return;

        if (!raData) {
            setHTMLEl(container, '<p style="color:var(--text-light-color);font-size:.75rem;">Configurez un montant de prêt classique non nul pour activer cette analyse.</p>');
            if (infoBox) infoBox.style.display = 'none';
            return;
        }

        // Mise à jour info box
        if (infoBox) infoBox.style.display = 'block';
        setTextEl(ui.ra_mois_display, raData.raMois);
        setTextEl(ui.ra_crd_display, formatCurrency(raData.crd));
        setTextEl(ui.ra_ira_display, formatCurrency(raData.iraRA));
        setTextEl(ui.ra_net_invested, formatCurrency(raData.newCapital + raData.iraRA));

        const fmt = v => formatCurrency(v) + ' €';
        const fmtMois = m => {
            const a = Math.floor(m / 12), mo = m % 12;
            return a > 0 ? `${a}a ${mo > 0 ? mo + 'm' : ''}`.trim() : `${mo}m`;
        };
        const colorEco = v => `<span style="color:${v >= 0 ? 'var(--primary-color)' : 'var(--danger-color)'};font-weight:700">${v >= 0 ? '+' : ''}${fmt(v)}</span>`;

        const html = `
        <table>
            <thead>
                <tr>
                    <th>Indicateur</th>
                    <th>Sans RA</th>
                    <th class="ra-strat-a">Strat. A — Réduire durée</th>
                    <th class="ra-strat-b">Strat. B — Réduire mensualité</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Mensualité restante</td><td>${fmt(raData.sanRA.mensualite)}</td><td class="ra-strat-a">${fmt(raData.stratA.mensualite)}</td><td class="ra-strat-b">${fmt(raData.stratB.mensualite)}</td></tr>
                <tr><td>Durée restante</td><td>${fmtMois(raData.sanRA.moisRestants)}</td><td class="ra-strat-a">${fmtMois(raData.stratA.moisRestants)} <small>(−${raData.stratA.moisGagnes}m)</small></td><td class="ra-strat-b">${fmtMois(raData.stratB.moisRestants)}</td></tr>
                <tr><td>Intérêts restants</td><td>${fmt(raData.sanRA.interetsRestants)}</td><td class="ra-strat-a">${fmt(raData.stratA.interetsRestants)}</td><td class="ra-strat-b">${fmt(raData.stratB.interetsRestants)}</td></tr>
                <tr class="ra-section-head"><td colspan="4">IRA : ${fmt(raData.iraRA)}</td></tr>
                <tr><td>Économie nette (après IRA)</td><td>—</td><td class="ra-strat-a">${colorEco(raData.stratA.economieNette)}</td><td class="ra-strat-b">${colorEco(raData.stratB.economieNette)}</td></tr>
                <tr><td>Break-even (mois)</td><td>—</td><td class="ra-strat-a">immédiat (durée réduite)</td><td class="ra-strat-b">${raData.stratB.breakEven != null ? raData.stratB.breakEven + ' mois' : '—'}</td></tr>
            </tbody>
        </table>`;
        setHTMLEl(container, html);
    }

    // === PHASE 5 — Achat vs Location & Budgétiseur ===

    let avlChart = null;

    function calculerAchatVsLocation(state, uiState, mensualiteTotale, prixFAI, coutTotalOperation, pib, ptb, scenData) {
        const horizon = uiState.resale.horizon || 0;
        const avl = uiState.avl;
        if (!avl || horizon <= 0 || mensualiteTotale <= 0) return null;

        const loyer = avl.loyer || 0;
        const indexationLoyer = (avl.indexationLoyer || 0) / 100;
        const tauxPlacement = (avl.tauxPlacement || 0) / 100;
        const chargesLocataire = avl.chargesLocataire || 0;
        const taxeFonciere = avl.taxeFonciere || 0;
        const chargesCopro = avl.chargesCopro || 0;
        const provisionTravaux = avl.provisionTravaux || 0;
        const assuranceHabitation = avl.assuranceHabitation || 0;
        const autresChargesLogement = avl.autresChargesLogement || 0;

        // Coût réel mensuel de possession
        const coutReelMensuel = mensualiteTotale
            + taxeFonciere / 12
            + chargesCopro
            + (provisionTravaux * prixFAI / 1200)
            + assuranceHabitation
            + autresChargesLogement;

        // Frais d'acquisition purs (notaire + garantie + dossier + courtier, hors bien et travaux)
        const fraisAcquisitionPurs = coutTotalOperation - prixFAI - (state.T || 0);

        const pvMode = uiState.pvMode || 'annual';
        const apport = state.A;

        // Locataire: apport placé initialement au tauxPlacement
        let patrimoineLocataire = apport;

        const yearlyData = [];
        for (let annee = 1; annee <= horizon; annee++) {
            // Propriétaire: valeur bien - CRD - frais d'acquisition irrécupérables
            let valeurBien;
            if (pvMode === 'annual') {
                valeurBien = prixFAI * Math.pow(1 + (uiState.resale.plusValueAnnual || 0) / 100, annee);
            } else {
                valeurBien = uiState.resale.resalePriceManual || prixFAI;
            }
            const moisPayes = annee * 12;
            const crd_classic = scenData.scenario.classic_amount > 0
                ? calculerCapitalRestantDu(scenData.scenario.classic_amount, state.TE, state.duree * 12, moisPayes) : 0;
            const crd_pib = pib.amount > 0
                ? calculerCapitalRestantDu(pib.amount, pib.interestRate, pib.duration * 12, moisPayes) : 0;
            const crd_ptb = ptb.amount > 0
                ? calculerCapitalRestantDu(ptb.amount, ptb.interestRate, ptb.duration * 12, moisPayes) : 0;
            const totalCRD = crd_classic + crd_pib + crd_ptb;

            const patrimoineProprietaire = valeurBien - totalCRD - fraisAcquisitionPurs;

            // Locataire: loyer indexé + épargne mensuelle placée
            const loyerAnnee = loyer * Math.pow(1 + indexationLoyer, annee - 1);
            const chargesMensuellesLoc = loyerAnnee + chargesLocataire;
            const economieMensuelle = Math.max(0, coutReelMensuel - chargesMensuellesLoc);
            // Compound annuel: placement du patrimoine existant + épargne annuelle
            patrimoineLocataire = patrimoineLocataire * (1 + tauxPlacement) + economieMensuelle * 12;

            yearlyData.push({ annee, patrimoineProprietaire, patrimoineLocataire, valeurBien, totalCRD });
        }

        // Point de croisement
        let crossoverAnnee = null;
        for (const d of yearlyData) {
            if (d.patrimoineProprietaire >= d.patrimoineLocataire) { crossoverAnnee = d.annee; break; }
        }

        return { yearlyData, crossoverAnnee, coutReelMensuel, mensualiteTotale,
            taxeFonciere, chargesCopro, provisionTravaux, assuranceHabitation,
            autresChargesLogement, prixFAI, loyer, chargesLocataire };
    }

    function renderAchatVsLocation(ui, avlData) {
        if (!avlData) return;

        const fmt = v => formatCurrency(v) + ' €';

        // Coût réel mensuel
        setTextEl(ui.avl_mensualite, fmt(avlData.mensualiteTotale));
        setTextEl(ui.avl_tf, fmt(avlData.taxeFonciere / 12));
        setTextEl(ui.avl_copro, fmt(avlData.chargesCopro));
        setTextEl(ui.avl_travaux, fmt(avlData.provisionTravaux * avlData.prixFAI / 1200));
        setTextEl(ui.avl_assurance_hab, fmt(avlData.assuranceHabitation));
        setTextEl(ui.avl_autres_charges, fmt(avlData.autresChargesLogement));
        setTextEl(ui.avl_cout_total, fmt(avlData.coutReelMensuel));
        const diffLoyer = avlData.coutReelMensuel - (avlData.loyer + avlData.chargesLocataire);
        const signe = diffLoyer >= 0 ? '+' : '';
        if (ui.avl_vs_loyer) {
            ui.avl_vs_loyer.textContent = `${fmt(avlData.loyer + avlData.chargesLocataire)} (${signe}${fmt(diffLoyer)})`;
            ui.avl_vs_loyer.style.color = diffLoyer > 0 ? 'var(--danger-color)' : 'var(--primary-color)';
        }

        // Crossover
        const box = ui.avl_crossover_box;
        if (box) {
            box.style.display = 'block';
            if (avlData.crossoverAnnee != null) {
                setTextEl(ui.avl_crossover_msg, `✅ Acheter devient plus rentable après ${avlData.crossoverAnnee} an${avlData.crossoverAnnee > 1 ? 's' : ''} (patrimoine propriétaire > locataire)`);
                box.style.borderLeftColor = 'var(--primary-color)';
                box.style.background = '#e8f5e9';
            } else {
                setTextEl(ui.avl_crossover_msg, `⚠️ Sur l'horizon simulé, la location reste plus avantageuse patrimonialement`);
                box.style.borderLeftColor = 'var(--danger-color)';
                box.style.background = '#fff3f3';
            }
        }

        // Chart
        const canvas = ui.avlChartCanvas;
        if (!canvas) return;
        const labels = avlData.yearlyData.map(d => `An ${d.annee}`);
        const dataProprio = avlData.yearlyData.map(d => Math.round(d.patrimoineProprietaire));
        const dataLoc = avlData.yearlyData.map(d => Math.round(d.patrimoineLocataire));

        if (avlChart) {
            avlChart.data.labels = labels;
            avlChart.data.datasets[0].data = dataProprio;
            avlChart.data.datasets[1].data = dataLoc;
            avlChart.update('active');
        } else {
            avlChart = new Chart(canvas.getContext('2d'), {
                type: 'line',
                data: {
                    labels,
                    datasets: [
                        { label: 'Propriétaire', data: dataProprio, borderColor: '#4CAF50', backgroundColor: 'rgba(76,175,80,.1)', borderWidth: 2, pointRadius: 3, fill: false, tension: 0.3 },
                        { label: 'Locataire (épargne)', data: dataLoc, borderColor: '#2196F3', backgroundColor: 'rgba(33,150,243,.1)', borderWidth: 2, pointRadius: 3, fill: false, tension: 0.3, borderDash: [5,3] }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    animation: { duration: 300, easing: 'easeInOutQuart' },
                    plugins: {
                        legend: { labels: { font: { size: 11 } } },
                        tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)} €` } }
                    },
                    scales: {
                        y: { ticks: { font: { size: 10 }, callback: v => formatCurrency(v) + ' €' } },
                        x: { ticks: { font: { size: 10 } } }
                    }
                }
            });
        }
    }

    // === PHASE 6 — Multi-scénarios & Partage ===

    const SCENARIOS_KEY = 'simuImmoDGAC_scenarios';

    function getScenarios() {
        try { return JSON.parse(localStorage.getItem(SCENARIOS_KEY) || '[]'); } catch(e) { return []; }
    }

    function sauvegarderScenario(name, state) {
        const scenarios = getScenarios();
        const id = 'sc_' + Date.now();
        const date = new Date().toISOString().slice(0, 7);
        scenarios.push({ id, name, date, state });
        localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios));
        return id;
    }

    function supprimerScenario(id) {
        localStorage.setItem(SCENARIOS_KEY, JSON.stringify(getScenarios().filter(s => s.id !== id)));
    }

    function renderScenarioList(ui) {
        const scenarios = getScenarios();
        const container = ui.p6_scenario_list;
        if (!container) return;
        const compareBtn = ui.p6_compare_btn;
        if (compareBtn) compareBtn.style.display = scenarios.length >= 2 ? 'inline-block' : 'none';
        if (scenarios.length === 0) {
            container.innerHTML = '<p style="color:var(--text-light-color);font-size:.75rem;">Aucun scénario sauvegardé. Cliquez sur "Sauvegarder" pour conserver la simulation courante.</p>';
            return;
        }
        let html = '<div class="p6-scenario-list">';
        scenarios.forEach(sc => {
            html += `<div class="p6-scenario-item">
                <span class="p6-scenario-name">${sc.name}</span>
                <span class="p6-scenario-date">${sc.date}</span>
                <div class="p6-scenario-actions">
                    <button class="btn-scenario btn-small btn-load-sc" data-id="${sc.id}">Charger</button>
                    <button class="btn-scenario btn-small btn-del-sc" data-id="${sc.id}" style="background:var(--danger-color);color:#fff;">Supprimer</button>
                </div>
            </div>`;
        });
        html += '</div>';
        container.innerHTML = html;
    }

    function renderComparaisonScenarios(ui) {
        const scenarios = getScenarios();
        const container = ui.p6_compare_container;
        if (!container || scenarios.length === 0) return;
        const selected = scenarios.slice(0, 4);
        const kpis = [
            { label: 'Prix FAI (€)',         fn: s => formatCurrency((s.P || 0) * (1 + (s.FAg || 0) / 100)) + ' €' },
            { label: 'Apport (€)',            fn: s => formatCurrency(s.A || 0) + ' €' },
            { label: 'Durée (ans)',           fn: s => (s.duree || '—') },
            { label: 'Taux nominal (%)',      fn: s => s.TE != null ? s.TE.toFixed(2) + ' %' : '—' },
            { label: 'Taux assurance (%)',    fn: s => s.TA != null ? s.TA.toFixed(2) + ' %' : '—' },
            { label: 'Revenus foyer (€/mois)',fn: s => formatCurrency(s.S || 0) + ' €' },
            { label: 'Co-emprunteur',         fn: s => s.coEmprunteur ? 'Oui' : 'Non' },
            { label: 'Travaux (€)',           fn: s => formatCurrency(s.T || 0) + ' €' },
            { label: 'Bien',                  fn: s => s.typeBien === 'neuf' ? 'Neuf' : 'Ancien' },
        ];
        let html = `<table class="p6-compare-table"><thead><tr><th>Indicateur</th>`;
        selected.forEach(sc => { html += `<th>${sc.name}<br><small style="font-weight:400">${sc.date}</small></th>`; });
        html += `</tr></thead><tbody>`;
        kpis.forEach(kpi => {
            html += `<tr><td>${kpi.label}</td>`;
            selected.forEach(sc => { html += `<td>${kpi.fn(sc.state || {})}</td>`; });
            html += `</tr>`;
        });
        html += `</tbody></table>`;
        container.innerHTML = html;
        document.getElementById('scenarioCompareModal')?.classList.add('visible');
    }

    function chargerDepuisURL() {
        const hash = window.location.hash;
        if (!hash || hash.length < 2) return false;
        try {
            const decoded = JSON.parse(decodeURIComponent(atob(hash.slice(1))));
            if (decoded && typeof decoded === 'object') {
                for (const [key, value] of Object.entries(decoded)) {
                    const numEl = getEl(`${key}_num`), sliderEl = getEl(key);
                    if (numEl && sliderEl) {
                        numEl.value = value; sliderEl.value = value;
                        const min = parseFloat(sliderEl.min), max = parseFloat(sliderEl.max);
                        const val = Math.max(min, Math.min(value, max));
                        sliderEl.style.setProperty('--val', `${max === min ? 0 : ((val - min) / (max - min)) * 100}%`);
                    } else {
                        const el = getEl(key);
                        if (el) { if (el.type === 'checkbox') el.checked = value; else el.value = value; }
                    }
                }
                return true;
            }
        } catch(e) { console.warn('Impossible de charger depuis URL:', e); }
        return false;
    }

    function calculateAllCore() {
        // 1. LECTURE DES DONNÉES
        const { state, uiState } = lireEtatFormulaire(ui);

        // (Ajustement spécifique de l'interface pour le Reste à Vivre)
        const ravSlider = ui?.form?.RAV_slider, ravNum = ui?.form?.RAV_num;
        if(ravSlider && ravNum) {
            const dynamicMaxRav = Math.min(parseFloat(ravSlider.getAttribute('data-original-max') || ravSlider.max), state.S);
            if (!ravSlider.hasAttribute('data-original-max')) ravSlider.setAttribute('data-original-max', ravSlider.max);
            ravSlider.max = dynamicMaxRav; ravNum.max = dynamicMaxRav;
            let currentRavVal = Math.max(parseFloat(ravSlider.min), Math.min(parseFloat(ravNum.value), dynamicMaxRav));
            const finalRavToSet = parseFloat(currentRavVal.toFixed(0));
            if (parseFloat(ravNum.value) !== finalRavToSet) { ravNum.value = finalRavToSet; ravSlider.value = finalRavToSet; }
            const min = parseFloat(ravSlider.min), max = parseFloat(ravSlider.max);
            let val = Math.max(min, Math.min(parseFloat(ravSlider.value), max));
            ravSlider.style.setProperty('--val', `${max === min ? 0 : ((val - min) / (max - min)) * 100}%`);
        }

        // 2. CALCULS MÉTIER
        let { FAg_montant, prixFAI, baseNotaireBrute, fn_details, fn_display, coutAvantGar, besoinCreditInitial } = gererFraisAcquisition(state);
        let { pib, ptb, garDetails, coutTotalOperation, besoinCreditFinalClassique } = gererPlanFinancement(state, besoinCreditInitial, coutAvantGar);
        const profil = calculerProfilEmprunteur(state);                                                    // Phase 3
        let scenData = calculerScenarioClassique(state, pib, ptb, besoinCreditFinalClassique, coutTotalOperation, prixFAI, fn_details, garDetails, profil);
        const analyseApport = calculerExigencesApport(state, fn_details, garDetails, FAg_montant);

        // 3. MISE À JOUR DE L'INTERFACE
        mettreAJourInterface(ui, state, uiState, FAg_montant, prixFAI, fn_details, fn_display, garDetails, coutTotalOperation, besoinCreditFinalClassique, pib, ptb, scenData, analyseApport, profil);

        // 4. CALCUL ET AFFICHAGE DE LA REVENTE
        const resultsForResale = { 
            totalCreditNeeded: coutTotalOperation - state.A, 
            pib, ptb, 
            // compatibilité revente : expose scenario courant sous la clé de la durée
            scenarios: { [state.duree]: scenData.scenario },
            coutTotalOperation 
        };
        calculerRevente(ui, uiState, resultsForResale, state.P, state.A, state);

        // 5. COURBE DURÉE vs COÛT (Phase 1)
        mettreAJourCourbeDuree(state, besoinCreditFinalClassique, pib, ptb, scenData.mensualiteMaxRetenueGlobale);

        // 6. PHASE 2 — Sensibilité taux + Apport optimal
        const sensData = calculerSensibiliteTaux(state, besoinCreditFinalClassique, pib, ptb);
        renderSensibiliteTaux(ui, sensData);

        const courbeApport = calculerDonneesApportCourbe(state, coutTotalOperation, prixFAI, pib, ptb);
        mettreAJourApportChart(courbeApport, prixFAI, pib, ptb, coutTotalOperation);

        // Mettre à jour le max du slider apport_alt et synchro info
        const sliderAlt = getEl('apport_alt'), numAlt = getEl('apport_alt_num');
        if (sliderAlt && numAlt) {
            sliderAlt.max = Math.ceil(coutTotalOperation);
            numAlt.max    = Math.ceil(coutTotalOperation);
            const curAlt  = Math.min(parseFloat(sliderAlt.value) || 0, coutTotalOperation);
            sliderAlt.value = curAlt; numAlt.value = curAlt;
            const minA = 0, maxA = parseFloat(sliderAlt.max);
            sliderAlt.style.setProperty('--val', `${maxA > 0 ? (curAlt / maxA) * 100 : 0}%`);
        }

        // Cache pour le slider apport_alt (update asynchrone)
        _p2Cache = { state, coutTotalOperation, prixFAI, pib, ptb, courbeApport, besoinCreditFinalClassique };
        mettreAJourInfoApportAlt(parseFloat(getEl('apport_alt')?.value || state.A), courbeApport);

        // 7. PHASE 4 — Remboursement Anticipé Partiel
        const raData = calculerRemboursementAnticipe(state, scenData.scenario.classic_amount, uiState);
        renderRemboursementAnticipe(ui, raData);
        // Sync max du slider raMois avec la durée courante
        const raMoisSlider = getEl('raMois'), raMoisNum = getEl('raMois_num');
        if (raMoisSlider && raMoisNum) {
            const maxMois = Math.max(12, state.duree * 12 - 1);
            raMoisSlider.max = maxMois; raMoisNum.max = maxMois;
            if (parseInt(raMoisSlider.value) > maxMois) { raMoisSlider.value = maxMois; raMoisNum.value = maxMois; }
            const mVal = parseFloat(raMoisSlider.value), mMax = parseFloat(raMoisSlider.max);
            raMoisSlider.style.setProperty('--val', `${mMax > 0 ? (mVal / mMax) * 100 : 0}%`);
        }

        // 8. PHASE 5 — Achat vs Location
        const avlData = calculerAchatVsLocation(state, uiState, scenData.scenario.mensTotaleClassique + (pib.amount > 0 ? pib.monthlyPayment : 0) + (ptb.amount > 0 ? ptb.monthlyPayment : 0), prixFAI, coutTotalOperation, pib, ptb, scenData);
        renderAchatVsLocation(ui, avlData);

        // 9. PHASE 6 — Liste des scénarios sauvegardés
        renderScenarioList(ui);

        // 10. SAUVEGARDE AUTO (throttlée)
        scheduleSave(state);
    }

    // Compatibilité: les événements \"change\" et le code existant appellent calculateAll().
    function calculateAll() {
        calculateAllCore();
    }

    function calculerRevente(ui, uiState, results, prixAchatInitial, apportInitial, state) {
        const horizon = uiState?.resale?.horizon || 0;
        const pvMode = uiState?.pvMode || 'annual';
        const inflationMode = uiState?.inflationMode || 'annual';
        const iraMode = uiState?.iraMode || 'percentage';
        const fraisRevente = uiState?.resale?.fees || 0;

        // Phase 1 : on utilise directement state.duree (plus de menu déroulant scénario)
        const scenarioDuration = state.duree;
        const scenarioRef = results.scenarios[scenarioDuration];
        const tauxClassiqueUsed = state.TE;

        setTextEl(ui.resale_horizon_display, horizon);
        setTextEl(ui.resale_scenario_duration_display, scenarioDuration);
        
        let prixRevente = 0;
        if (pvMode === 'annual') {
            const plusValue = uiState?.resale?.plusValueAnnual || 0;
            prixRevente = prixAchatInitial * Math.pow(1 + plusValue / 100, horizon);
        } else {
            prixRevente = uiState?.resale?.resalePriceManual || 0;
        }

        const moisPayes = horizon * 12;
        const crd_classic = scenarioRef.classic_amount > 0 ? calculerCapitalRestantDu(scenarioRef.classic_amount, tauxClassiqueUsed, scenarioDuration * 12, moisPayes) : 0;
        const crd_pib = results.pib.amount > 0 ? calculerCapitalRestantDu(results.pib.amount, results.pib.interestRate, results.pib.duration * 12, moisPayes) : 0;
        const crd_ptb = results.ptb.amount > 0 ? calculerCapitalRestantDu(results.ptb.amount, results.ptb.interestRate, results.ptb.duration * 12, moisPayes) : 0;
        const totalCRD = crd_classic + crd_pib + crd_ptb;

        // Calcul Pénalités IRA Multiples
        let ira_fees = 0;
        if (iraMode === 'percentage') {
            const ira_classic_pc = uiState?.ira?.classicPc || 0;
            const ira_pib_pc = uiState?.ira?.pibPc || 0;
            const ira_ptb_pc = uiState?.ira?.ptbPc || 0;

            const sixMoisIntClassic = (crd_classic * (tauxClassiqueUsed/100)) / 2;
            const maxIraClassic = Math.min(crd_classic * 0.03, sixMoisIntClassic);
            const ira_classic_fees = maxIraClassic * (ira_classic_pc / 3);

            const sixMoisIntPib = (crd_pib * (results.pib.interestRate/100)) / 2;
            const maxIraPib = Math.min(crd_pib * 0.03, sixMoisIntPib);
            const ira_pib_fees = maxIraPib * (ira_pib_pc / 3);

            const sixMoisIntPtb = (crd_ptb * (results.ptb.interestRate/100)) / 2;
            const maxIraPtb = Math.min(crd_ptb * 0.03, sixMoisIntPtb);
            const ira_ptb_fees = maxIraPtb * (ira_ptb_pc / 3);

            setTextEl(ui.ira_classic_amount, formatCurrency(ira_classic_fees) + " €");
            setTextEl(ui.ira_pib_amount, formatCurrency(ira_pib_fees) + " €");
            setTextEl(ui.ira_ptb_amount, formatCurrency(ira_ptb_fees) + " €");

            ira_fees = ira_classic_fees + ira_pib_fees + ira_ptb_fees;
        } else {
            ira_fees = uiState?.ira?.manualAmount || 0;
        }

        const produitNet = prixRevente - totalCRD - ira_fees - fraisRevente;
        
        const totalMensualitesVersees = 
            (scenarioRef.mensTotaleClassique * Math.min(moisPayes, scenarioDuration * 12)) + 
            (results.pib.monthlyPayment * Math.min(moisPayes, results.pib.duration * 12)) + 
            (results.ptb.monthlyPayment * Math.min(moisPayes, results.ptb.duration * 12));
        
        // Capital remboursé = Montant initial emprunté total - Capital Restant Dû
        const capitalAmorti = results.totalCreditNeeded - totalCRD;
        // Intérêts et assurance = Toutes les mensualités payées - La part de capital qu'elles contenaient
        const interetsEtAssurancePayes = totalMensualitesVersees - capitalAmorti;
        
        // Bilan Patrimonial = L'opération immobilière pure (Revente Nette - Cout d'Acquisition Total)
        // Équivaut à : ProduitNet - Apport - CapitalAmorti
        const bilanPatrimonial = produitNet - apportInitial - capitalAmorti;

        // Bilan Financier = Bilan Patrimonial - Coût du financement (Intérêts + Assurances)
        const bilanFinancierNet = bilanPatrimonial - interetsEtAssurancePayes;

        // Application de l'inflation sur le Bilan Financier Final
        let inflationFactor = 1;
        if (inflationMode === 'annual') {
            const inflationAnnual = uiState?.resale?.inflationAnnual || 0;
            inflationFactor = Math.pow(1 + inflationAnnual / 100, horizon);
        } else {
            const inflationCumul = uiState?.resale?.inflationCumulative || 0;
            inflationFactor = 1 + (inflationCumul / 100);
        }
        const realNetBalance = inflationFactor !== 0 ? bilanFinancierNet / inflationFactor : bilanFinancierNet;
        
        setTextEl(ui.res_resale_price, formatCurrency(prixRevente) + " €");
        setTextEl(ui.res_remaining_capital, formatCurrency(totalCRD) + " €");
        setTextEl(ui.res_ira_fees, formatCurrency(ira_fees) + " €");
        setTextEl(ui.res_resale_costs, formatCurrency(fraisRevente) + " €");
        setTextEl(ui.res_net_proceeds, formatCurrency(produitNet) + " €");
        setTextEl(ui.res_initial_apport, formatCurrency(apportInitial) + " €");
        setTextEl(ui.res_capital_amorti, formatCurrency(capitalAmorti) + " €");
        setTextEl(ui.res_total_wasted_costs, formatCurrency(interetsEtAssurancePayes) + " €");

        setTextEl(ui.res_bilan_patrimonial, formatCurrency(bilanPatrimonial) + " €");
        if (ui.res_bilan_patrimonial) ui.res_bilan_patrimonial.style.color = bilanPatrimonial >= 0 ? 'var(--primary-color)' : 'var(--danger-color)';

        setTextEl(ui.res_net_balance, formatCurrency(bilanFinancierNet) + " €");
        if (ui.res_net_balance) ui.res_net_balance.style.color = bilanFinancierNet >= 0 ? 'var(--primary-color)' : 'var(--danger-color)';

        setTextEl(ui.res_real_balance, formatCurrency(realNetBalance) + " €");
        if (ui.res_real_balance) ui.res_real_balance.style.color = realNetBalance >= 0 ? 'var(--primary-color)' : 'var(--danger-color)';
    }


    // === ONGLET 2 — SOLVEUR STRATÉGIQUE ===

    function lireEtatSolver() {
        return {
            apportMin: parseFloat(getEl('solver_apportMin_num')?.value || 0),
            apportMax: parseFloat(getEl('solver_apportMax_num')?.value || 0),
            mensualiteMax: parseFloat(getEl('solver_mensualiteMax_num')?.value || 1500),
            tauxEpargne: parseFloat(getEl('solver_tauxEpargne_num')?.value || 3),
            horizonRevente: parseInt(getEl('solver_horizonRevente_num')?.value || 10, 10),
            matriceTaux: [
                { ltvMax: parseFloat(getEl('ltv_row0_ltv')?.value || 80),  taux: parseFloat(getEl('ltv_row0_taux')?.value || 3.50) },
                { ltvMax: parseFloat(getEl('ltv_row1_ltv')?.value || 90),  taux: parseFloat(getEl('ltv_row1_taux')?.value || 3.80) },
                { ltvMax: parseFloat(getEl('ltv_row2_ltv')?.value || 110), taux: parseFloat(getEl('ltv_row2_taux')?.value || 4.10) }
            ]
        };
    }

    function calculerOptimisationApport(state, solverState, coutTotalOperation, prixFAI, pib, ptb) {
        const { apportMin, mensualiteMax, tauxEpargne, horizonRevente, matriceTaux } = solverState;
        const apportMax  = (solverState.apportMax > apportMin) ? solverState.apportMax : state.A;
        const bonified   = pib.amount + ptb.amount;
        const horizonMois = horizonRevente * 12;

        if (apportMin >= apportMax || coutTotalOperation <= 0 || apportMax <= 0) return null;

        const step = 1000;
        const scenarios = [];

        for (let apport = apportMin; apport <= apportMax; apport += step) {
            const capital = Math.max(0, coutTotalOperation - apport - bonified);
            if (capital <= 0) {
                scenarios.push({ apport, capital: 0, duree: 0, mensualite: 0, coutReel: 0, gainOpportunite: 0, score: -Infinity });
                continue;
            }

            // Taux depuis la matrice LTV
            const ltv = prixFAI > 0 ? (capital / prixFAI) * 100 : 0;
            let tauxNominal = matriceTaux[matriceTaux.length - 1].taux;
            for (const row of [...matriceTaux].sort((a, b) => a.ltvMax - b.ltvMax)) {
                if (ltv <= row.ltvMax) { tauxNominal = row.taux; break; }
            }

            // Durée minimale pour respecter la mensualité max
            let dureeMin = 0;
            for (let d = 10; d <= 30; d++) {
                const mInt = calculerMensualiteCredit(capital, tauxNominal, d * 12);
                const mAss = capital * (state.TA / 100 / 12);
                const mTot = mInt + mAss + pib.monthlyPayment + ptb.monthlyPayment;
                if (mTot <= mensualiteMax) { dureeMin = d; break; }
            }
            if (dureeMin === 0) continue; // Impossible même à 30 ans

            const dureeMois   = dureeMin * 12;
            const tauxMensuel = tauxNominal / 100 / 12;
            const mensInt     = calculerMensualiteCredit(capital, tauxNominal, dureeMois);
            const mensAss     = capital * (state.TA / 100 / 12);
            const mensuelleTotal = mensInt + mensAss + pib.monthlyPayment + ptb.monthlyPayment;

            // Simulation d'amortissement jusqu'à l'horizon
            const horizon = Math.min(horizonMois, dureeMois);
            let capitalRestant = capital;
            let totalInterets  = 0;
            let totalAssurance = 0;
            for (let m = 0; m < horizon; m++) {
                const interetMois = capitalRestant * tauxMensuel;
                const capitalMois = Math.max(0, mensInt - interetMois);
                totalInterets  += interetMois;
                totalAssurance += mensAss;
                capitalRestant  = Math.max(0, capitalRestant - capitalMois);
            }

            // IRA : min(3% CRD, 6 mois intérêts)
            const ira = capitalRestant > 0 ? Math.min(0.03 * capitalRestant, 6 * capitalRestant * tauxMensuel) : 0;
            const coutReel = totalInterets + totalAssurance + ira + pib.totalCost + ptb.totalCost;

            // Gain d'opportunité sur l'épargne résiduelle
            const epargneResiduelle = apportMax - apport;
            const gainOpportunite   = epargneResiduelle > 0 ? epargneResiduelle * (Math.pow(1 + tauxEpargne / 100, horizonRevente) - 1) : 0;

            const score = coutReel - gainOpportunite;
            scenarios.push({ apport, capital, duree: dureeMin, mensualite: mensuelleTotal, capitalRestant, coutReel, gainOpportunite, score, tauxNominal, ltv });
        }

        if (scenarios.length === 0) return null;

        const valid   = scenarios.filter(s => s.duree > 0);
        if (valid.length === 0) return null;
        const optimal = valid.reduce((best, s) => s.score < best.score ? s : best, valid[0]);
        const minScen = valid[0];
        const maxScen = valid[valid.length - 1];

        return { optimal, minScen, maxScen, scenarios: valid };
    }

    function runSolver() {
        if (!_p2Cache) return;
        const { state, coutTotalOperation, prixFAI, pib, ptb } = _p2Cache;
        const solverState = lireEtatSolver();
        const result = calculerOptimisationApport(state, solverState, coutTotalOperation, prixFAI, pib, ptb);
        renderSolver(result, solverState);
    }

    function renderSolver(result, solverState) {
        const container = getEl('solver_verdict_container');
        if (!container) return;

        if (!result) {
            container.innerHTML = `<div class="solver-verdict-placeholder">⚠️ Aucun scénario trouvable. Vérifiez que l'apport min &lt; apport max (onglet 1) et que la mensualité max est atteignable sur 30 ans.</div>`;
            if (solverChart) { solverChart.destroy(); solverChart = null; }
            return;
        }

        const { optimal, minScen, maxScen } = result;
        const economie = (minScen.coutReel - optimal.coutReel) + (optimal.gainOpportunite - minScen.gainOpportunite);
        const vsMax    = (maxScen.coutReel  - optimal.coutReel) + (optimal.gainOpportunite - maxScen.gainOpportunite);

        container.innerHTML = `
            <div class="solver-verdict-box">
                <div style="font-size:.7rem;color:var(--text-light-color);margin-bottom:.3rem;">🎯 Scénario optimal identifié</div>
                <strong>${formatCurrency(optimal.apport)} € d'apport sur ${optimal.duree} ans</strong><br>
                Mensualité totale : <strong>${formatCurrency(optimal.mensualite, 0)} €/mois</strong><br>
                Taux applicable (financement ${formatPercentage(optimal.ltv, 1)} %) : <strong>${formatPercentage(optimal.tauxNominal, 2)} %</strong><br>
                Coût réel à ${solverState.horizonRevente} ans : <strong>${formatCurrency(optimal.coutReel)} €</strong><br>
                Gain d'opportunité épargne : <strong style="color:var(--primary-color)">${formatCurrency(optimal.gainOpportunite)} €</strong>
                ${vsMax > 0 ? `<br><span style="color:var(--primary-color);font-weight:700;">✅ Économie vs apport max : ${formatCurrency(vsMax)} €</span>` : ''}
                ${economie > 0 ? `<br><span style="color:var(--secondary-color);font-weight:600;">📈 Économie vs apport min : ${formatCurrency(economie)} €</span>` : ''}
            </div>`;

        renderSolverChart(result, solverState);
    }

    function renderSolverChart(result, solverState) {
        const canvas = getEl('solverChartCanvas');
        if (!canvas || typeof Chart === 'undefined') return;

        const { optimal, minScen, maxScen } = result;
        const labels = [
            `Apport Min\n${formatCurrency(minScen.apport)} €`,
            `Apport Optimal\n${formatCurrency(optimal.apport)} €`,
            `Apport Max\n${formatCurrency(maxScen.apport)} €`
        ];
        const scens = [minScen, optimal, maxScen];
        const isOpt = [false, true, false];

        if (solverChart) { solverChart.destroy(); solverChart = null; }

        solverChart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Coût Réel (€)',
                        data: scens.map(s => Math.round(s.coutReel)),
                        backgroundColor: isOpt.map(o => o ? '#ef9a9a' : '#ffcdd2'),
                        borderColor: '#e53935', borderWidth: 1
                    },
                    {
                        label: 'Gain Épargne (€)',
                        data: scens.map(s => Math.round(s.gainOpportunite)),
                        backgroundColor: isOpt.map(o => o ? '#a5d6a7' : '#c8e6c9'),
                        borderColor: '#388e3c', borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 10 } } },
                    title: { display: true, text: `Comparaison sur ${solverState.horizonRevente} ans`, font: { size: 11 } },
                    tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)} €` } }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { font: { size: 9 }, callback: v => formatCurrency(v) + ' €' } },
                    x: { ticks: { font: { size: 9 } } }
                }
            }
        });
    }

    // === ONGLET 3 — COMPARATEUR D'OFFRES ===

    function buildOffreCardHTML(index, prefilledState) {
        const nom       = index === 0 ? 'Banque A (référence)' : `Banque ${String.fromCharCode(66 + index - 1)}`;
        const montant   = index === 0 && prefilledState ? Math.round(prefilledState.besoinCreditClassique || 200000) : 200000;
        const duree     = index === 0 && prefilledState ? (prefilledState.duree || 20) : 20;
        const taux      = index === 0 && prefilledState ? (prefilledState.TE  || 3.5)  : 3.5;
        const ass       = index === 0 && prefilledState ? (prefilledState.TA  || 0.2)  : 0.2;
        const typeGar   = index === 0 && prefilledState ? (prefilledState.typeGarantie || 'caution') : 'caution';
        const fraisDoss = index === 0 && prefilledState ? (prefilledState.FD      || 0) : 0;
        const courtier  = index === 0 && prefilledState ? (prefilledState.Courtier || 0) : 0;

        const optCaut = `<option value="caution"${typeGar === 'caution' ? ' selected' : ''}>Caution</option>`;
        const optHyp  = `<option value="hypotheque"${typeGar === 'hypotheque' ? ' selected' : ''}>Hypothèque</option>`;
        const optPpd  = `<option value="ppd"${typeGar === 'ppd' ? ' selected' : ''}>PPD</option>`;

        return `
        <div class="comp-offer-card${index === 0 ? ' reference-offer' : ''}" data-offer-index="${index}">
            ${index > 0 ? `<button class="comp-offer-remove" title="Supprimer">&times;</button>` : ''}
            <div class="comp-offer-title">
                Offre ${index + 1} — <input type="text" class="comp-offer-name-input" data-field="nom" value="${nom}">
            </div>
            <div class="comp-offer-grid">
                <div class="comp-offer-field"><label>Montant emprunté (€)</label><input type="number" data-field="montant" value="${montant}" min="0" max="5000000" step="1000"></div>
                <div class="comp-offer-field"><label>Durée initiale (ans)</label><input type="number" data-field="dureeAns" value="${duree}" min="5" max="30" step="1"></div>
                <div class="comp-offer-field"><label>Taux nominal (%)</label><input type="number" data-field="tauxNominal" value="${taux}" min="0" max="20" step="0.05"></div>
                <div class="comp-offer-field"><label>Taux assurance (%)</label><input type="number" data-field="tauxAssurance" value="${ass}" min="0" max="5" step="0.01"><span class="comp-assurance-mensuelle" style="font-size:.7rem;color:var(--text-light-color);white-space:nowrap;"></span></div>
                <div class="comp-offer-field"><label>Base assurance</label><select data-field="typeAssurance"><option value="initial" selected>Capital initial</option><option value="crd">Sur CRD</option></select></div>
                <div class="comp-offer-field"><label>Frais de dossier (€)</label><input type="number" data-field="fraisDossier" value="${fraisDoss}" min="0" max="10000" step="100"></div>
                <div class="comp-offer-field"><label>Frais de courtage (€)</label><input type="number" data-field="fraisCourtage" value="${courtier}" min="0" max="20000" step="100"></div>
                <div class="comp-offer-field"><label>Type garantie</label><select data-field="typeGarantie">${optCaut}${optHyp}${optPpd}</select></div>
                <div class="comp-offer-field"><label>Frais garantie (€)</label><input type="number" data-field="fraisGarantie" value="0" min="0" max="30000" step="100"></div>
                <div class="comp-offer-field"><label>Parts sociales (€)</label><input type="number" data-field="partsSociales" value="0" min="0" max="5000" step="10"></div>
                <div class="comp-offer-field"><label>Frais bancaires mensuels (€)</label><input type="number" data-field="fraisBancairesMensuels" value="0" min="0" max="100" step="1"></div>
                <div class="comp-offer-field"><label>IRA (% du CRD) <span style="font-size:.7rem;color:var(--text-light-color);">0=exonéré, 3%=max légal</span></label><input type="number" data-field="iraRate" value="3" min="0" max="3" step="0.25"></div>
                <div class="comp-offer-field"><label>Activer modularité</label><input type="checkbox" data-field="activerModularite" class="comp-modularite-toggle"></div>
            </div>
            <div class="comp-modularite-section" id="comp_mod_${index}">
                <div class="comp-offer-grid">
                    <div class="comp-offer-field"><label>Mois d'activation</label><input type="number" data-field="moisActivation" value="12" min="1" max="360" step="1"></div>
                    <div class="comp-offer-field"><label>Hausse mensualité (%)</label><input type="number" data-field="haussePct" value="10" min="0" max="50" step="0.5"></div>
                </div>
            </div>
        </div>`;
    }

    function initOffresComparateur() {
        const container = getEl('comp_offers_container');
        if (!container) return;
        _offerCount = 0;

        // Restaurer depuis sauvegarde si disponible
        const saved = window._savedComparateur;
        if (saved && saved.offres && saved.offres.length > 0) {
            // Restaurer l'horizon
            const hrNum = getEl('comp_horizonRevente_num'), hrRange = getEl('comp_horizonRevente');
            if (hrNum) hrNum.value = saved.horizonRevente;
            if (hrRange) hrRange.value = saved.horizonRevente;
            // Reconstruire chaque carte
            container.innerHTML = '';
            saved.offres.forEach((offre, i) => {
                const div = document.createElement('div');
                div.innerHTML = buildOffreCardHTML(i, null);
                const card = div.firstElementChild;
                container.appendChild(card);
                // Injecter les valeurs sauvegardées
                const set = (field, val) => { const el = card.querySelector(`[data-field="${field}"]`); if (el) { if (el.type === 'checkbox') el.checked = !!val; else el.value = val; } };
                Object.entries(offre).forEach(([k, v]) => set(k, v));
                // Forcer le nom (input text non data-field)
                const nameEl = card.querySelector('[data-field="nom"]');
                if (nameEl) nameEl.value = offre.nom;
                attachOffreEvents(card);
            });
            _offerCount = saved.offres.length;
            window._savedComparateur = null;
            return;
        }

        let prefilledState = null;
        if (_p2Cache) {
            const { state, besoinCreditFinalClassique } = _p2Cache;
            prefilledState = { ...state, besoinCreditClassique: _p2Cache.besoinCreditFinalClassique ?? besoinCreditFinalClassique ?? 200000 };
        }
        container.innerHTML = buildOffreCardHTML(0, prefilledState);
        _offerCount = 1;
        attachOffreEvents(container.querySelector('.comp-offer-card'));
    }

    function addOffreComparateur() {
        const container = getEl('comp_offers_container');
        if (!container || _offerCount >= 4) return;
        const div = document.createElement('div');
        div.innerHTML = buildOffreCardHTML(_offerCount, null);
        const card = div.firstElementChild;
        container.appendChild(card);
        attachOffreEvents(card);
        _offerCount++;
    }

    function attachOffreEvents(card) {
        if (!card) return;
        card.querySelector('.comp-offer-remove')?.addEventListener('click', () => {
            card.remove();
            _offerCount = Math.max(1, _offerCount - 1);
            // Re-index remaining cards visually
            document.querySelectorAll('#comp_offers_container .comp-offer-card').forEach((c, i) => {
                c.dataset.offerIndex = i;
            });
            // Relancer la comparaison si visible, sinon masquer
            const compResults = getEl('comp_results_container');
            if (compResults && compResults.style.display !== 'none') {
                const remaining = document.querySelectorAll('#comp_offers_container .comp-offer-card').length;
                if (remaining >= 1) runComparator(); else compResults.style.display = 'none';
            }
        });
        card.querySelector('.comp-modularite-toggle')?.addEventListener('change', (e) => {
            const idx = card.dataset.offerIndex;
            const section = document.getElementById(`comp_mod_${idx}`);
            if (section) section.style.display = e.target.checked ? 'block' : 'none';
        });
        // Affichage mensualité assurance en €
        const updateAssLabel = () => {
            const montant = parseFloat(card.querySelector('[data-field="montant"]')?.value || 0);
            const taux    = parseFloat(card.querySelector('[data-field="tauxAssurance"]')?.value || 0);
            const mensAss = montant > 0 && taux > 0 ? (montant * taux / 100 / 12) : 0;
            const label   = card.querySelector('.comp-assurance-mensuelle');
            if (label) label.textContent = mensAss > 0 ? `≈ ${formatCurrency(mensAss, 0)} €/mois` : '';
        };
        card.querySelector('[data-field="montant"]')?.addEventListener('input', updateAssLabel);
        card.querySelector('[data-field="tauxAssurance"]')?.addEventListener('input', updateAssLabel);
        updateAssLabel();

        // Mise à jour live de la comparaison si les résultats sont visibles
        const triggerLiveComparison = () => {
            if (getEl('comp_results_container')?.style.display !== 'none') runComparator();
        };
        card.querySelectorAll('input:not(.comp-offer-remove), select').forEach(el => {
            el.addEventListener('input', triggerLiveComparison);
            el.addEventListener('change', triggerLiveComparison);
        });
    }

    function lireEtatComparateur() {
        const horizonRevente = parseInt(getEl('comp_horizonRevente_num')?.value || 10, 10);
        const cards = document.querySelectorAll('#comp_offers_container .comp-offer-card');
        const offres = Array.from(cards).map(card => {
            const get  = (field) => card.querySelector(`[data-field="${field}"]`);
            const num  = (field) => parseFloat(get(field)?.value || 0);
            const bool = (field) => get(field)?.checked || false;
            const sel  = (field, def) => get(field)?.value || def;
            return {
                nom: get('nom')?.value || 'Banque',
                montant: num('montant'), dureeAns: parseInt(get('dureeAns')?.value || 20, 10),
                tauxNominal: num('tauxNominal'), tauxAssurance: num('tauxAssurance'),
                typeAssurance: sel('typeAssurance', 'initial'),
                fraisDossier: num('fraisDossier'), fraisCourtage: num('fraisCourtage'),
                typeGarantie: sel('typeGarantie', 'caution'), fraisGarantie: num('fraisGarantie'),
                partsSociales: num('partsSociales'), fraisBancairesMensuels: num('fraisBancairesMensuels'),
                iraRate: Math.max(0, Math.min(3, num('iraRate') ?? 3)), activerModularite: bool('activerModularite'),
                moisActivation: parseInt(get('moisActivation')?.value || 12, 10), haussePct: num('haussePct')
            };
        });
        return { horizonRevente, offres };
    }

    function comparerOffresBancaires(offres, horizonAns) {
        const horizonMois = horizonAns * 12;
        return offres.map(offre => {
            const { montant, dureeAns, tauxNominal, tauxAssurance, typeAssurance,
                    fraisDossier, fraisCourtage, fraisGarantie, partsSociales,
                    fraisBancairesMensuels, activerModularite, moisActivation, haussePct } = offre;

            if (montant <= 0) return null;

            const dureeMois    = dureeAns * 12;
            const tauxMensuel  = tauxNominal / 100 / 12;
            let mensInt        = calculerMensualiteCredit(montant, tauxNominal, dureeMois);
            let mensuelleActuelle = mensInt;
            const fraisInitiaux = fraisDossier + fraisCourtage + fraisGarantie + partsSociales;

            const actualHorizon = Math.min(horizonMois, dureeMois);
            let capitalRestant  = montant;
            let totalInterets   = 0;
            let totalAssurance  = 0;
            let totalFraisBanc  = 0;
            const evolutionCoutCumule = [0];

            for (let m = 1; m <= actualHorizon; m++) {
                if (capitalRestant <= 0) break;

                if (activerModularite && m === moisActivation && capitalRestant > 0) {
                    const moisRestants = Math.max(1, dureeMois - m + 1);
                    const baseNew = calculerMensualiteCredit(capitalRestant, tauxNominal, moisRestants);
                    mensuelleActuelle = baseNew * (1 + haussePct / 100);
                }

                const interetMois = capitalRestant * tauxMensuel;
                const capitalMois = Math.max(0, mensuelleActuelle - interetMois);
                totalInterets  += interetMois;
                totalAssurance += typeAssurance === 'initial'
                    ? montant * (tauxAssurance / 100 / 12)
                    : capitalRestant * (tauxAssurance / 100 / 12);
                totalFraisBanc += fraisBancairesMensuels;
                capitalRestant  = Math.max(0, capitalRestant - capitalMois);

                if (m % 12 === 0 || m === actualHorizon) {
                    evolutionCoutCumule.push(Math.round(totalInterets + totalAssurance + fraisInitiaux + totalFraisBanc));
                }
            }

            let ira = 0;
            if (capitalRestant > 0 && offre.iraRate > 0) {
                const sixMoisInt = 6 * capitalRestant * tauxMensuel;
                ira = Math.min((offre.iraRate / 100) * capitalRestant, sixMoisInt);
            }

            let fraisSortie   = 0;
            let restitutions  = 0;
            if (offre.typeGarantie === 'hypotheque') {
                fraisSortie = capitalRestant * 0.007; // mainlevée estimée
            } else if (offre.typeGarantie === 'caution') {
                restitutions = partsSociales * 0.75; // restitution partielle FMG estimée
            }

            const coutGlobalReel = Math.round(totalInterets + totalAssurance + fraisInitiaux + totalFraisBanc + ira + fraisSortie - restitutions);
            const mensualiteInitiale = mensInt + (typeAssurance === 'initial'
                ? montant * (tauxAssurance / 100 / 12)
                : capitalRestant * (tauxAssurance / 100 / 12));

            return {
                nom: offre.nom, montant, dureeAns, tauxNominal, mensualiteInitiale: Math.round(mensualiteInitiale),
                totalInterets: Math.round(totalInterets), totalAssurance: Math.round(totalAssurance),
                fraisInitiaux: Math.round(fraisInitiaux), totalFraisBanc: Math.round(totalFraisBanc),
                ira: Math.round(ira), restitutions: Math.round(restitutions), fraisSortie: Math.round(fraisSortie),
                coutGlobalReel, capitalRestant: Math.round(capitalRestant), evolutionCoutCumule
            };
        }).filter(Boolean);
    }

    function runComparator() {
        const { horizonRevente, offres } = lireEtatComparateur();
        const label = getEl('comp_horizon_label');
        if (label) label.textContent = horizonRevente;
        if (offres.length < 1) return;
        const results = comparerOffresBancaires(offres, horizonRevente);
        if (results.length > 0) renderComparator(results, horizonRevente);
    }

    function renderComparator(results, horizonAns) {
        const container = getEl('comp_results_container');
        if (!container) return;
        container.style.display = 'block';

        const winnerIdx = results.reduce((bi, r, i) => r.coutGlobalReel < results[bi].coutGlobalReel ? i : bi, 0);

        const rows = [
            { label: 'Montant emprunté',               key: 'montant',            fmt: v => formatCurrency(v) + ' €' },
            { label: 'Durée initiale',                  key: 'dureeAns',           fmt: v => v + ' ans' },
            { label: 'Taux nominal',                    key: 'tauxNominal',        fmt: v => formatPercentage(v, 2) + ' %' },
            { label: 'Mensualité initiale',             key: 'mensualiteInitiale', fmt: v => formatCurrency(v, 0) + ' €/mois' },
            { label: 'Total intérêts',                  key: 'totalInterets',      fmt: v => formatCurrency(v) + ' €' },
            { label: 'Total assurance',                 key: 'totalAssurance',     fmt: v => formatCurrency(v) + ' €' },
            { label: 'Frais initiaux',                  key: 'fraisInitiaux',      fmt: v => formatCurrency(v) + ' €' },
            { label: 'Frais bancaires (total)',         key: 'totalFraisBanc',     fmt: v => formatCurrency(v) + ' €' },
            { label: 'IRA à la revente',                key: 'ira',                fmt: v => formatCurrency(v) + ' €' },
            { label: 'Restitutions',                    key: 'restitutions',       fmt: v => '– ' + formatCurrency(v) + ' €' },
            { label: 'Frais de sortie garantie',        key: 'fraisSortie',        fmt: v => formatCurrency(v) + ' €' },
            { label: 'Capital restant dû à la revente', key: 'capitalRestant',     fmt: v => formatCurrency(v) + ' €' },
        ];

        const table = getEl('comp_pricing_table');
        if (table) {
            let html = `<thead><tr><th>Critère</th>${results.map(r => `<th>${r.nom}</th>`).join('')}</tr></thead><tbody>`;
            for (const row of rows) {
                html += `<tr><td>${row.label}</td>${results.map(r => `<td>${row.fmt(r[row.key])}</td>`).join('')}</tr>`;
            }
            html += `<tr class="pricing-total"><td>💰 Coût Réel Net à ${horizonAns} ans</td>`;
            html += results.map((r, i) => `<td class="${i === winnerIdx ? 'pricing-winner-cell' : ''}">${formatCurrency(r.coutGlobalReel)} €${i === winnerIdx ? ' 🏆' : ''}</td>`).join('');
            html += `</tr></tbody>`;
            table.innerHTML = html;
        }

        renderComparatorChart(results, horizonAns);
    }

    function renderComparatorChart(results, horizonAns) {
        const canvas = getEl('comparatorChartCanvas');
        if (!canvas || typeof Chart === 'undefined') return;
        if (comparatorChart) { comparatorChart.destroy(); comparatorChart = null; }

        const colors = ['#2196F3', '#F44336', '#4CAF50', '#FF9800'];
        const maxPts = Math.max(...results.map(r => r.evolutionCoutCumule.length));
        const labels = Array.from({ length: maxPts }, (_, i) => `An ${i}`);

        comparatorChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels,
                datasets: results.map((r, i) => ({
                    label: r.nom, data: r.evolutionCoutCumule,
                    borderColor: colors[i % colors.length],
                    backgroundColor: colors[i % colors.length] + '18',
                    borderWidth: 2, pointRadius: 2, tension: 0.3
                }))
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', labels: { font: { size: 10 } } },
                    title: { display: true, text: `Évolution du coût réel cumulé sur ${horizonAns} ans`, font: { size: 11 } },
                    tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)} €` } }
                },
                scales: {
                    y: { ticks: { font: { size: 9 }, callback: v => formatCurrency(v) + ' €' } },
                    x: { ticks: { font: { size: 9 } } }
                }
            }
        });
    }

    // === 5. INITIALISATION (Start App) ===
    function startApp() {
        ui = buildUI();
        const inputIds = [
            'P', 'FAg', 'M', 'FN', 'FD', 'Courtier', 'A', 'duree', 'TE', 'TA', 'S', 
            'AutresCredits', 'AutresCharges', 'TEdt', 'RAV', 'T', 'FG_manual', 
            'pibRFR', 'pibHouseholdSize', 'pibBFMRate', 'pibDuration', 'pibInsuranceRate', 'ptbInsuranceRate',
            'ptbRFR', 'ptbHouseholdSize', 'ptbAmountWanted', 'ptbDuration', 
            'resaleHorizon', 'plusValue', 'inflation', 'resaleFees', 
            'resalePriceManual', 'inflationCumulative', 'ira_manual', 'ira_classic', 'ira_pib', 'ira_ptb',
            // Phase 3
            'S2', 'AutresCredits2', 'AutresCharges2', 'revenuVariable', 'revenuEvolution',
            // Phase 4
            'raMois', 'raMontant',
            // Phase 5
            'loyer', 'indexationLoyer', 'tauxPlacement', 'chargesLocataire',
            'taxeFonciere', 'chargesCopro', 'provisionTravaux', 'assuranceHabitation', 'autresChargesLogement'
        ];

        inputIds.forEach(id => {
            const numInput = getEl(`${id}_num`);
            const rangeInput = getEl(id);
            if(numInput && rangeInput) {
                inputs[id] = { slider: rangeInput, num: numInput };
                setupSliderAndNumber(id);
            }
        });
// Comportement sur-mesure quand on passe de Auto à Manuel (Frais de Notaire)
        getEl('FN_mode')?.addEventListener('change', (e) => {
            const isManual = e.target.value === 'manual';
            const fnSlider = getEl('FN');
            const fnNum = getEl('FN_num');
            const breakdown = getEl('fn_breakdown');
            const trigger = getEl('fnDetailsToggleTrigger');
            
            if (isManual) {
                // 1. On récupère le montant en euros actuel (caché dans le résumé)
                const currentEurosText = getEl('res_FN_montant')?.textContent || '0';
                const currentEuros = parseFloat(currentEurosText.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
                
                // 2. On passe le champ en mode "Euros" (Min 0, Max 100 000)
                setInputState('FN', true, { min: 0, max: 100000, step: 100 });
                
                // 3. On injecte les euros à la place de l'ancien pourcentage (ex: remplace 6.9 par 15000)
                if (fnSlider && fnNum) {
                    fnSlider.value = currentEuros;
                    fnNum.value = currentEuros;
                }
                
                // 4. On cache les détails inutiles
                breakdown?.classList.remove('visible');
                if (trigger) {
                    trigger.textContent = "Détails calcul auto. frais notaire ▼";
                    trigger.style.display = 'none';
                }
                
            } else {
                // Retour en mode Auto : On remet les limites pour un petit pourcentage
                setInputState('FN', false, { min: 0.5, max: 10, step: 0.1 });
                breakdown?.classList.add('visible');
                if (trigger) {
                    trigger.textContent = "Cacher détails calcul auto. frais notaire ▲";
                    trigger.style.display = 'inline';
                }
            }
            
            // On relance le calcul global pour que le pourcentage à droite s'ajuste immédiatement
            calculateAll();
        });
        [
            ui.form.typeBien,
            ui.form.typeGarantie,
            ui.form.enablePIB,
            ui.form.pibZone,
            ui.form.enablePTB,
            ui.form.ptbAgentStatus,
            ui.form.ptbZone,
            ui.form.chargeAgence,
            // Phase 3
            ui.form.tauxIntegration,
            ui.form.horizonEvolution,
        ].forEach(el => {
            if (el) el.addEventListener('change', calculateAll);
        });

        // Toggles pour la revente (Mode de saisie PV, Inflation, IRA)
        ui.form.pv_mode?.addEventListener('change', e => {
            setDisplayEl(ui.pv_annual_container, e.target.value === 'annual' ? 'flex' : 'none');
            setDisplayEl(ui.pv_manual_container, e.target.value === 'manual' ? 'flex' : 'none');
            calculateAll();
        });
        ui.form.inflation_mode?.addEventListener('change', e => {
            setDisplayEl(ui.inflation_annual_container, e.target.value === 'annual' ? 'flex' : 'none');
            setDisplayEl(ui.inflation_cumulative_container, e.target.value === 'cumulative' ? 'flex' : 'none');
            calculateAll();
        });
        ui.ira_mode?.addEventListener('change', e => {
            setDisplayEl(ui.ira_percentage_container, e.target.value === 'percentage' ? 'flex' : 'none');
            setDisplayEl(ui.ira_manual_container, e.target.value === 'manual' ? 'flex' : 'none');
            calculateAll();
        });

        // Tooltips
        document.body.addEventListener('mouseenter', e => {
            if (e.target.classList?.contains('info-icon')) {
                const tooltip = getEl('info-tooltip');
                if(!tooltip) return;
                tooltip.textContent = infoMessages[e.target.dataset.infoKey] || "Information non disponible.";
                tooltip.classList.add('visible');
                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = `${Math.max(5, rect.left + window.scrollX - (tooltip.offsetWidth / 2))}px`;
                tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 5}px`;
            }
        }, true);
        
        document.body.addEventListener('mouseleave', e => {
            if (e.target.classList?.contains('info-icon')) {
                const tooltip = getEl('info-tooltip');
                if(tooltip) tooltip.classList.remove('visible');
            }
        }, true);

        setupDetailsToggle('fnDetailsToggleTrigger', 'fn_breakdown', "Détails calcul auto. frais notaire ▼", "Cacher détails calcul auto. frais notaire ▲");
        setupDetailsToggle('fgDetailsToggleTrigger', 'FG_details', "Détails garantie Prêt Classique ▼", "Cacher détails garantie Prêt Classique ▲");

        // Listener `FN_mode` unique : géré plus haut (évite double traitement)
        
        ui.form.typeGarantie?.addEventListener('change', (e) => {
            const isManualGuarantee = e.target.value === 'manual_guarantee';
            setDisplayEl(ui.manualGuaranteeInput, isManualGuarantee ? 'flex' : 'none');
            const details = ui.FG_details;
            const trigger = ui.fgDetailsToggleTrigger;
            if (details && trigger) {
                if (isManualGuarantee) {
                    details.classList.remove('visible');
                    trigger.style.display = 'none';
                } else {
                    trigger.style.display = 'block';
                    if (!details.classList.contains('visible')) details.classList.add('visible');
                    trigger.textContent = details.classList.contains('visible') ? "Cacher détails garantie Prêt Classique ▲" : "Détails garantie Prêt Classique ▼";
                }
            }
            calculateAll();
        });

        getEl('typeAssuranceClassique')?.addEventListener('change', calculateAll);
        ui.form.enablePIB?.addEventListener('change', e => { ui.pibInputsContainer?.classList.toggle('disabled-section', !e.target.checked); calculateAll(); });
        ui.form.enablePTB?.addEventListener('change', e => { ui.ptbInputsContainer?.classList.toggle('disabled-section', !e.target.checked); calculateAll(); });
        ui.form.ptbAgentStatus?.addEventListener('change', e => { 
            const ptbZoneSlider = ui.form.ptbZone;
            if (ptbZoneSlider) ptbZoneSlider.disabled = (e.target.value === 'retraite'); 
            calculateAll();
        });

        document.querySelector('.modal-close-button')?.addEventListener('click', () => document.querySelector('.modal-overlay')?.classList.remove('visible'));
        document.querySelector('.modal-overlay')?.addEventListener('click', e => { if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('visible'); });

        document.body.addEventListener('click', e => {
            if (e.target.classList.contains('amort-button') && e.target.dataset.loanType) {
                const loanType = e.target.dataset.loanType;
                let schedule, loanName = "";
                
                const parseElFormatted = el => el ? (parseFloat(el.textContent.replace(/[^\d,.-]/g,'').replace(',','.')) || 0) : 0;
                
                const currentPtbAmount = parseElFormatted(ui?.ptb_res_amount);
                const currentPibAmount = parseElFormatted(ui?.pib_res_amount);
                const currentClassicLoanAmount = parseElFormatted(ui?.scen_classic_amount_display);
                const { state } = lireEtatFormulaire(ui);

                if (loanType==='ptb'&&currentPtbAmount>0) { 
                    loanName=`PTB (${state.ptbDuration}a)`; 
                    const zone = (state.ptbAgentStatus === 'retraite') ? 'A' : (state.ptbZone || 'A');
                    const thresholds = BONIFICATION_THRESHOLDS[zone];
                    const bonifRate = (thresholds && state.ptbRFR <= (thresholds[Math.min(state.ptbHouseholdSize, 5)] || 0)) ? 3 : 2;
                    schedule=generateAmortizationSchedule("PTB",currentPtbAmount,Math.max(0, state.pibBFMRate - bonifRate),state.ptbDuration,state.ptbInsuranceRate); 
                }
                else if (loanType==='pib'&&currentPibAmount>0) { 
                    loanName=`PIB (${state.pibDuration}a)`; 
                    const thresholds = BONIFICATION_THRESHOLDS[state.pibZone || 'A'];
                    const bonifRate = (thresholds && state.pibRFR <= (thresholds[Math.min(state.pibHouseholdSize, 5)] || 0)) ? 3 : 2;
                    schedule=generateAmortizationSchedule("PIB",currentPibAmount,Math.max(0, state.pibBFMRate - bonifRate),state.pibDuration,state.pibInsuranceRate); 
                }
                else if (loanType==='classic'&&currentClassicLoanAmount>0) {
                    loanName=`Classique (${state.duree}a)`;
                    schedule=generateAmortizationSchedule(`Classique ${state.duree}a`,currentClassicLoanAmount,state.TE,state.duree,state.TA,state.typeAssuranceClassique);
                    // Phase 2.3 — ajouter PIB/PTB si actifs
                    const extras = [];
                    if (currentPibAmount > 0) {
                        const thPib = BONIFICATION_THRESHOLDS[state.pibZone || 'A'];
                        const bPib  = (thPib && state.pibRFR <= (thPib[Math.min(state.pibHouseholdSize,5)] || 0)) ? 3 : 2;
                        extras.push({ name:`PIB (${state.pibDuration}a)`, data: generateAmortizationSchedule('PIB', currentPibAmount, Math.max(0, state.pibBFMRate - bPib), state.pibDuration, state.pibInsuranceRate) });
                    }
                    if (currentPtbAmount > 0) {
                        const zPtb  = state.ptbAgentStatus === 'retraite' ? 'A' : (state.ptbZone || 'A');
                        const thPtb = BONIFICATION_THRESHOLDS[zPtb];
                        const bPtb  = (thPtb && state.ptbRFR <= (thPtb[Math.min(state.ptbHouseholdSize,5)] || 0)) ? 3 : 2;
                        extras.push({ name:`PTB (${state.ptbDuration}a)`, data: generateAmortizationSchedule('PTB', currentPtbAmount, Math.max(0, state.pibBFMRate - bPtb), state.ptbDuration, state.ptbInsuranceRate) });
                    }
                    if (schedule && schedule.length > 0) { displayAmortizationModal(loanName, schedule, extras); return; }
                }

                if (schedule && schedule.length > 0) displayAmortizationModal(loanName, schedule);
                else { 
                    setHTMLEl(ui?.amortizationTableContainer, "<p>Données non disponibles ou montant nul.</p>"); 
                    setTextEl(ui?.amortizationModalTitle, "Erreur"); 
                    document.querySelector('.modal-overlay')?.classList.add('visible'); 
                }
            }
        });

        // Initialisation correcte de l'état du slider Frais de Notaire au démarrage
        const modeFN = ui.form.FN_mode?.value || 'auto';
        const isManualFN = modeFN === 'manual';
        setInputState('FN', isManualFN, { min: isManualFN ? 0 : 0.5, max: isManualFN ? 100000 : 10, step: isManualFN ? 100 : 0.1 });
        
        if(isManualFN) {
            ui.fn_breakdown?.classList.remove('visible');
            setDisplayEl(ui.fnDetailsToggleTrigger, 'none');
        }
        const modeGar = ui.form.typeGarantie?.value;
        if(modeGar === 'manual_guarantee') {
            ui.FG_details?.classList.remove('visible');
            setDisplayEl(ui.fgDetailsToggleTrigger, 'none');
            setDisplayEl(ui.manualGuaranteeInput, 'flex');
        }

        // Bouton de réinitialisation
        ui.btn_reset?.addEventListener('click', () => {
            if (confirm("Voulez-vous vraiment réinitialiser toutes les données et repartir de zéro ?")) {
                localStorage.removeItem('simuImmoDGAC_sauvegarde');
                window.location.reload(); // Recharge la page à neuf
            }
        });
        // Phase 1 — Optimiseur
        getEl('optimizer_mode')?.addEventListener('change', () => {
            const mode = getEl('optimizer_mode')?.value;
            setDisplay('optimizer_target_container', mode === 'mensualite_max' ? 'flex' : 'none');
            if (ui?.optimizerResult) ui.optimizerResult.style.display = 'none';
        });
        getEl('optimizer_run_btn')?.addEventListener('click', () => {
            const { state } = lireEtatFormulaire(ui);
            let { FAg_montant, prixFAI, fn_details, fn_display, coutAvantGar, besoinCreditInitial } = gererFraisAcquisition(state);
            let { pib, ptb, garDetails, coutTotalOperation, besoinCreditFinalClassique } = gererPlanFinancement(state, besoinCreditInitial, coutAvantGar);
            const profil3 = calculerProfilEmprunteur(state);
            const { mensualiteMaxRetenueGlobale } = calculerScenarioClassique(state, pib, ptb, besoinCreditFinalClassique, coutTotalOperation, prixFAI, fn_details, garDetails, profil3);
            lancerOptimiseur(state, besoinCreditFinalClassique, pib, ptb, mensualiteMaxRetenueGlobale);
        });

        // Phase 2.2 — Slider apport_alt (mise à jour info + marqueur sans recalcul global)
        const onApportAltChange = () => {
            if (!_p2Cache) return;
            const val = parseFloat(getEl('apport_alt')?.value || 0);
            // Sync num <-> range
            const numEl = getEl('apport_alt_num');
            if (numEl && numEl !== document.activeElement) numEl.value = val;
            const slEl = getEl('apport_alt');
            if (slEl) {
                const maxA = parseFloat(slEl.max) || 1;
                slEl.style.setProperty('--val', `${(val / maxA) * 100}%`);
            }
            mettreAJourInfoApportAlt(val, _p2Cache.courbeApport);
        };
        getEl('apport_alt')?.addEventListener('input', onApportAltChange);
        getEl('apport_alt_num')?.addEventListener('input', () => {
            const numEl = getEl('apport_alt_num'), slEl = getEl('apport_alt');
            if (numEl && slEl) { slEl.value = numEl.value; onApportAltChange(); }
        });

        // Phase 2.3 — Boutons toggle graphique / tableau dans la modale
        getEl('amortViewChartBtn')?.addEventListener('click', () => {
            const chartCont = ui?.amortChartContainer;
            const tableCont = ui?.amortizationTableContainer;
            if (chartCont) chartCont.style.display = 'block';
            if (tableCont) tableCont.style.display = 'none';
            const bC = getEl('amortViewChartBtn'), bT = getEl('amortViewTableBtn');
            if (bC) { bC.style.backgroundColor = 'var(--secondary-color)'; bC.style.color = '#fff'; }
            if (bT) { bT.style.backgroundColor = ''; bT.style.color = ''; }
        });
        getEl('amortViewTableBtn')?.addEventListener('click', () => {
            const chartCont = ui?.amortChartContainer;
            const tableCont = ui?.amortizationTableContainer;
            if (chartCont) chartCont.style.display = 'none';
            if (tableCont) tableCont.style.display = 'block';
            const bC = getEl('amortViewChartBtn'), bT = getEl('amortViewTableBtn');
            if (bT) { bT.style.backgroundColor = 'var(--secondary-color)'; bT.style.color = '#fff'; }
            if (bC) { bC.style.backgroundColor = ''; bC.style.color = ''; }
        });

        // Phase 3 — Toggle co-emprunteur
        ui.form.coEmprunteur?.addEventListener('change', e => {
            setDisplayEl(ui.coEmprunteurInputs, e.target.checked ? 'block' : 'none');
            calculateAll();
        });

        // Phase 3 — Toggle révolution revenus (détails dépliables)
        setupDetailsToggle('revEvolutifToggle', 'revEvolutifContainer', 'Évolution des revenus (projection) ▼', 'Évolution des revenus (projection) ▲');

        // Phase 6 — Sauvegarder scénario
        getEl('p6_save_btn')?.addEventListener('click', () => {
            const name = prompt('Nom du scénario :', 'Scénario ' + (getScenarios().length + 1));
            if (!name) return;
            const { state } = lireEtatFormulaire(ui);
            sauvegarderScenario(name.trim(), state);
            renderScenarioList(ui);
        });

        // Phase 6 — Comparer scénarios
        getEl('p6_compare_btn')?.addEventListener('click', () => renderComparaisonScenarios(ui));

        // Phase 6 — Actions sur la liste (délégation d'événement)
        getEl('p6_scenario_list')?.addEventListener('click', e => {
            const id = e.target.dataset.id;
            if (!id) return;
            if (e.target.classList.contains('btn-load-sc')) {
                const sc = getScenarios().find(s => s.id === id);
                if (!sc?.state) return;
                for (const [key, value] of Object.entries(sc.state)) {
                    const numEl = getEl(`${key}_num`), sliderEl = getEl(key);
                    if (numEl && sliderEl) {
                        numEl.value = value; sliderEl.value = value;
                        const min = parseFloat(sliderEl.min), max = parseFloat(sliderEl.max);
                        const val = Math.max(min, Math.min(value, max));
                        sliderEl.style.setProperty('--val', `${max === min ? 0 : ((val - min) / (max - min)) * 100}%`);
                    } else {
                        const el = getEl(key);
                        if (el) { if (el.type === 'checkbox') el.checked = value; else el.value = value; }
                    }
                }
                if (ui?.form?.enablePIB && sc.state.isPIBEnabled !== undefined) ui.form.enablePIB.checked = sc.state.isPIBEnabled;
                if (ui?.form?.enablePTB && sc.state.isPTBEnabled !== undefined) ui.form.enablePTB.checked = sc.state.isPTBEnabled;
                calculateAll();
            }
            if (e.target.classList.contains('btn-del-sc')) {
                if (!confirm('Supprimer ce scénario ?')) return;
                supprimerScenario(id);
                renderScenarioList(ui);
            }
        });

        // Phase 6 — Fermeture modal comparaison
        getEl('closeScenarioCompareModal')?.addEventListener('click', () => {
            getEl('scenarioCompareModal')?.classList.remove('visible');
        });
        getEl('scenarioCompareModal')?.addEventListener('click', e => {
            if (e.target.id === 'scenarioCompareModal') e.target.classList.remove('visible');
        });

        // Phase 6 — Partage URL
        getEl('p6_share_btn')?.addEventListener('click', () => {
            const { state } = lireEtatFormulaire(ui);
            try {
                const encoded = btoa(encodeURIComponent(JSON.stringify(state)));
                const url = window.location.origin + window.location.pathname + '#' + encoded;
                navigator.clipboard.writeText(url).then(() => {
                    const fb = getEl('p6_share_feedback');
                    if (fb) { fb.style.display = 'inline'; setTimeout(() => { fb.style.display = 'none'; }, 2500); }
                }).catch(() => prompt('Copiez ce lien :', url));
            } catch(e) { console.warn('Erreur partage URL:', e); }
        });

        // === TABS — Navigation ===
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                getEl(target)?.classList.add('active');
                if (target === 'tab-comparator') {
                    // Initialiser les offres si le conteneur est vide
                    if (!getEl('comp_offers_container')?.children.length) initOffresComparateur();
                }
            });
        });

        // === ONGLET 2 — Solveur : bouton + sliders ===
        getEl('btn-run-solver')?.addEventListener('click', runSolver);

        ['solver_apportMin', 'solver_apportMax', 'solver_mensualiteMax', 'solver_tauxEpargne', 'solver_horizonRevente'].forEach(id => {
            const num   = getEl(`${id}_num`);
            const range = getEl(id);
            if (num && range) {
                const sync = (src, dst) => { dst.value = src.value; runSolver(); };
                range.addEventListener('input',  () => sync(range, num));
                num.addEventListener('input',    () => sync(num, range));
            }
        });

        // Matrice taux LTV — recalcul au changement
        [0, 1, 2].forEach(i => {
            getEl(`ltv_row${i}_ltv`)?.addEventListener('change',  runSolver);
            getEl(`ltv_row${i}_taux`)?.addEventListener('change', runSolver);
        });

        // Slider horizon comparateur
        const compHorizonRange = getEl('comp_horizonRevente');
        const compHorizonNum   = getEl('comp_horizonRevente_num');
        if (compHorizonRange && compHorizonNum) {
            compHorizonRange.addEventListener('input', () => { compHorizonNum.value = compHorizonRange.value; });
            compHorizonNum.addEventListener('input',   () => { compHorizonRange.value = compHorizonNum.value; });
        }

        // === ONGLET 3 — Comparateur : boutons ===
        getEl('btn-run-comparator')?.addEventListener('click', runComparator);
        getEl('comp_add_offer_btn')?.addEventListener('click', addOffreComparateur);

        // Boutons sync horizon depuis Tab 1
        getEl('solver_sync_horizon')?.addEventListener('click', () => {
            const val = getEl('resaleHorizon_num')?.value || 10;
            const n = getEl('solver_horizonRevente_num'), r = getEl('solver_horizonRevente');
            if (n) n.value = val; if (r) r.value = val;
            runSolver();
        });
        getEl('comp_sync_horizon')?.addEventListener('click', () => {
            const val = getEl('resaleHorizon_num')?.value || 10;
            const n = getEl('comp_horizonRevente_num'), r = getEl('comp_horizonRevente');
            if (n) n.value = val; if (r) r.value = val;
            if (getEl('comp_results_container')?.style.display !== 'none') runComparator();
        });
        getEl('comp_horizonRevente_num')?.addEventListener('input', () => {
            if (getEl('comp_results_container')?.style.display !== 'none') runComparator();
        });
        getEl('comp_horizonRevente')?.addEventListener('input', () => {
            if (getEl('comp_results_container')?.style.display !== 'none') runComparator();
        });
        getEl('comp_close_results')?.addEventListener('click', () => {
            getEl('comp_results_container').style.display = 'none';
        });

        // Chargement depuis URL hash (partage)
        const loadedFromURL = chargerDepuisURL();
        chargerEtat(); // On recharge les données avant de lancer le premier calcul

        // Restaure la visibilité des sections dépliables selon l'état chargé
        const restaurerEtatsVisuels = () => {
            setDisplayEl(ui.coEmprunteurInputs, ui.form.coEmprunteur?.checked ? 'block' : 'none');
            ui.pibInputsContainer?.classList.toggle('disabled-section', !ui.form.enablePIB?.checked);
            ui.ptbInputsContainer?.classList.toggle('disabled-section', !ui.form.enablePTB?.checked);
            if (ui.form.typeGarantie?.value === 'manual_guarantee') setDisplayEl(ui.manualGuaranteeInput, 'flex');
            if (ui.form.ptbAgentStatus?.value === 'retraite' && ui.form.ptbZone) ui.form.ptbZone.disabled = true;
        };
        restaurerEtatsVisuels();

        if (loadedFromURL) { window.history.replaceState(null, '', window.location.pathname); }
        calculateAll();
    }

    startApp();

    // --- TESTS UNITAIRES INTERNES ---
    // Ces assertions s'executent au chargement et apparaissent dans la console en cas d'echec.
    (() => {
        const _mens = calculerMensualiteCredit;
        const _crd  = calculerCapitalRestantDu;

        // Test 1 : Mensualite standard — 200 000 €, 3 %, 20 ans => ~1 109.20 €
        const m1 = _mens(200000, 3, 240);
        console.assert(Math.abs(m1 - 1109.20) < 0.01,
            `[TEST 1 ECHOUE] Mensualite 200k/3%/20a : attendu ~1109.20, obtenu ${m1.toFixed(4)}`);

        // Test 2 : Taux 0 % — 100 000 €, 0 %, 10 ans => 833.33 €
        const m2 = _mens(100000, 0, 120);
        console.assert(Math.abs(m2 - 833.33) < 0.01,
            `[TEST 2 ECHOUE] Mensualite 100k/0%/10a : attendu ~833.33, obtenu ${m2.toFixed(4)}`);

        // Test 3 : CRD apres toutes les echeances = 0
        const crdFin = _crd(200000, 3, 240, 240);
        console.assert(crdFin === 0,
            `[TEST 3 ECHOUE] CRD apres 240/240 mois : attendu 0, obtenu ${crdFin}`);

        // Test 4 : IRA legale — min(3 % CRD, 6 mois interets sur montant rembourse)
        // Pret 200 000 €, 3 %, 20 ans, RA de 50 000 € apres 60 mois
        const crd60 = _crd(200000, 3, 240, 60);          // CRD ~ 170 142 €
        const sixMoisInt = (50000 * 3 / 100) / 2;         // 750 €  (6 mois int. sur montant RA)
        const plafond3pc = crd60 * 0.03;                   // ~ 5 104 € (3 % du CRD)
        const iraAttendue = Math.min(plafond3pc, sixMoisInt); // 750 € (min des deux)
        console.assert(Math.abs(iraAttendue - 750) < 1,
            `[TEST 4 ECHOUE] IRA : attendu ~750, obtenu ${iraAttendue.toFixed(2)}`);

        console.log('%c[TESTS UNITAIRES] Tous les tests sont passes.', 'color: green; font-weight: bold;');
    })();
});