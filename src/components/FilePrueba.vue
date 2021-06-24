<template>
    <vue-html2pdf
    :show-layout="false"
    :float-layout="true"
    :enable-download="false"
    :preview-modal="false"
    filename="hehehe"
    :paginate-elements-by-height="1100"
    :pdf-quality="2"
    pdf-format="a4"
    pdf-orientation="portrait"
    pdf-content-width="800px"
    :manual-pagination="false"
 
    @progress="onProgress($event)"
    @startPagination="startPagination()"
    @hasPaginated="hasPaginated()"
    @beforeDownload="beforeDownload($event)"
    @hasDownloaded="hasDownloaded($event)"
    ref="html2Pdf"
>
    <pdf-content slot="pdf-content" />
</vue-html2pdf>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
 
export default {
    components: {
    VueHtml2pdf
    },
 
    methods: {
        async beforeDownload ({ html2pdf, options, pdfContent }) {
            await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
                const totalPages = pdf.internal.getNumberOfPages()
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i)
                    pdf.setFontSize(10)
                    pdf.setTextColor(150)
                    pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
                } 
            }).save()
        }
    }
}