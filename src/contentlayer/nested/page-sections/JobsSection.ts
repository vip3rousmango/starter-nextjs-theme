import { defineNestedType } from 'contentlayer/source-files';
import { Button } from '../Button';
import { Link } from '../Link';
import { makeCommontSectionFields } from './common';

export const JobsSection = defineNestedType(() => ({
    name: 'JobsSection',
    fields: {
        ...makeCommontSectionFields(),
        title: { type: 'string' },
        subtitle: { type: 'string' },
        jobLists: {
            type: 'list',
            of: JobList
        },
        styles: { type: 'json' }
    }
}));

const JobList = defineNestedType(() => ({
    name: 'JobList',
    fields: {
        title: { type: 'string' },
        items: {
            type: 'list',
            of: JobListItem
        }
    }
}));

const JobListItem = defineNestedType(() => ({
    name: 'JobListItem',
    fields: {
        title: { type: 'string' },
        location: { type: 'string' },
        text: { type: 'markdown' },
        actions: {
            type: 'list',
            of: [Button, Link]
        }
    }
}));
