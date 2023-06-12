<template>
  <ACard class="text-sm max-w-320px">
    <div class="p-4 a-card-spacer">
      <header class="flex items-center gap-x-2">
        <i class="i-carbon-circle-dash" />
        <div class="a-subtitle">
          Draft
        </div>
        <ABtn
          :icon="['i-bx-dots-horizontal-rounded', 'text-xl']"
          variant="text"
          class="spacing-50 px-1"
          color="inherit"
        >
          <AMenu class="[&>.a-card]-border-a-border [&>.a-card]-border-1">
            <AList class="text-sm children-[.a-list-item]-rounded-lg [--a-list-item-margin:0.18em_0.55em] [--a-list-item-padding:0.5em_0.65em]">
              <AListItem
                icon="i-bx-circle"
                text="Convert to issue"
                @click="console.log('Convert to issue!')"
              />
              <AListItem
                icon="i-bx-copy"
                text="Copy link in project"
                @click="console.log('Copy link in project!')"
              />
              <hr class="my-2">
              <AListItem
                icon="i-bx-archive"
                text="Archive"
                @click="console.log('Archive!')"
              />
              <AListItem
                icon="i-bx-trash"
                text="Delete from project"
                color="danger"
                @click="console.log('Delete from project!')"
              />
            </AList>
          </AMenu>
        </ABtn>
      </header>
      <div>
        Isn't Anu so dynamic? <i class="i-fluent-emoji-sparkles" />
      </div>
    </div>
  </ACard>
</template>
