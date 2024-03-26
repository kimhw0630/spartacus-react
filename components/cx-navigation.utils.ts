import { CmsLinkComponent, CmsNavigationNode, Component } from "hackathon-2023-storefront-sdk";

export function getComponentIds(data: CmsNavigationNode): Array<string> {
    const ids = new Set<string>([]);

    const queue = data.children ? [...data.children] : [];

    while (queue.length > 0) {
        const item = queue.pop();

        item?.entries?.forEach(entry => entry.itemId && ids.add(entry.itemId));

        queue.push(...(item?.children ?? []));
    }

    return Array.from(ids);
}

export function getTitle(node: CmsNavigationNode, components: Array<Component>): string | undefined {
    let title = node.title;

    if (!title) {
        const entry = node.entries?.[0];

        if (entry) {
            const linkComponent = components.find(component => component.uid === entry.itemId) as CmsLinkComponent;
            title = linkComponent?.linkName;
        }
    }

    return title;
}
