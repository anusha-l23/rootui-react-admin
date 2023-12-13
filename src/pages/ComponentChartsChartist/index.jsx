/**
 * External Dependencies
 */
import React, { Component } from 'react';

/**
 * Internal Dependencies
 */
import AsyncComponent from '../../components/async-component';
import PageWrap from '../../components/page-wrap';
import PageTitle from '../../components/page-title';
import PageContent from '../../components/page-content';

/**
 * Component
 */
class ComponentChartsChartistPage extends Component {
    render() {
        return (
            <PageWrap>
                <PageTitle
                    breadcrumbs={ {
                        '/': 'Home',
                        '#': 'Components',
                        '/component-icons-feather': {
                            title: 'Advanced',
                            sub: 'components_advanced',
                        },
                    } }
                >
                    <h1>Chats: Chartist</h1>
                </PageTitle>
                <PageContent
                    sideNav={ [
                        {
                            to: '#chartBar',
                            title: 'Bar',
                        }, {
                            to: '#pieGender',
                            title: 'Pie_Gender',
                        }, {
                            to: '#pieSize',
                            title: 'Pie_T-ShirtSize',
                        },
                    ] }
                >
                    <AsyncComponent component={ () => import( './content' ) } />
                </PageContent>
            </PageWrap>
        );
    }
}

export default ComponentChartsChartistPage;
